let canvas;
let ctx;
let canvasWidth;
let canvasHeight;
let effect;

function withContext(context, fn) {
  context.save();
  fn(context);
  context.restore();
}

/** This method will setup the canvas and context based on the html canvas available in the page. */
export const setupEffect = () => {
  canvas = document.getElementById('canvas-1');
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = 'white';

  effect = new Effect(canvas.width, canvas.height, ctx);
  effect.render(ctx);

  function animate() {
    effect.render(ctx);

    requestAnimationFrame(animate);
  }

  animate();
};

/** This effect will run whenever the screen gets resized */
export const resizeEffect = () => {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  if (canvas && effect) {
    effect.resize(canvas.width, canvas.height);
  }

  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
};

export const clearEffect = () => {
  // TODO: implement clear function
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

export const onZoomChange = (newZoom) => {
  if (effect) {
    effect.zoom = parseFloat(newZoom);
    effect.init(ctx);
  }
};

export const onCurveChange = (newCurve) => {
  if (effect) {
    effect.curve = parseFloat(newCurve);
    effect.init(ctx);
  }
};

export const onChangeColors = (newColors) => {
  if (effect) {
    effect.colors = newColors;
    effect.init(ctx);
  }
};

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
    this.speedX;
    this.speedY;

    this.speedModifier = Math.floor(Math.random() * 5 + 1);
    this.history = [{ x: this.x, y: this.y }];
    this.maxLength = Math.floor(Math.random() * 200 + 10);
    this.angle = 0;
    this.timer = this.maxLength * 2;
    this.color =
      this.effect.colors[Math.floor(Math.random() * this.effect.colors.length)];
  }

  draw(context) {
    withContext(context, () => {
      context.beginPath();
      context.strokeStyle = this.color;
      context.moveTo(this.history[0].x, this.history[0].y);

      for (let i = 0; i < this.history.length; i++) {
        const { x, y } = this.history[i];
        context.lineTo(x, y);
      }

      context.stroke();
    });
  }

  update() {
    this.timer--;
    if (this.timer >= 1) {
      let x = Math.floor(this.x / this.effect.cellSize);
      let y = Math.floor(this.y / this.effect.cellSize);
      let index = y * this.effect.cols + x;
      this.angle = this.effect.flowField[index];

      this.speedX = Math.cos(this.angle);
      this.speedY = Math.sin(this.angle);
      this.x += this.speedX * this.speedModifier;
      this.y += this.speedY * this.speedModifier;

      this.history.push({
        x: this.x,
        y: this.y,
      });
      if (this.history.length > this.maxLength) {
        this.history.shift();
      }
    } else if (this.history.length > 1) {
      this.history.shift();
    } else {
      this.reset();
    }
  }

  reset() {
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
    this.history = [
      {
        x: this.x,
        y: this.y,
      },
    ];
    this.timer = this.maxLength * 2;
  }
}

class Effect {
  constructor(width, height, ctx) {
    this.width = width;
    this.height = height;
    this.particles = [];
    this.numberOfParticles = 400;
    this.cellSize = 20;
    this.rows;
    this.cols;
    this.flowField = [];
    this.curve = 3;
    this.zoom = 0.12;
    this.debug = false;
    this.colors = [
      '#fbbf24',
      '#fcd34d',
      '#fef08a',
      '#84cc16',
      '#10b981',
      '#2dd4bf',
    ];
    this.init();

    window.addEventListener('keydown', (e) => {
      if (e.key === 'd' || e.key === 'D') {
        this.debug = !this.debug;
      }
    });
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    this.init();
  }

  drawText(context) {
    if (!this.debug) return;

    withContext(context, () => {
      context.font = '500px Impact';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText('JS', this.width * 0.5, this.height * 0.5);
    });
  }

  init(context) {
    /** Create flow field */
    this.rows = Math.floor(this.height / this.cellSize);
    this.cols = Math.floor(this.width / this.cellSize);
    this.flowField = [];

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let angle =
          (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
        this.flowField.push(angle);
      }
    }

    /** Create effect particles */
    this.particles = [];
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  drawGrid(context) {
    if (!this.debug) return;

    withContext(context, () => {
      context.strokeStyle = 'white';
      context.lineWidth = 0.3;

      // Draw grid columns
      for (let col = 0; col < this.cols; col++) {
        context.beginPath();
        context.moveTo(this.cellSize * col, 0);
        context.lineTo(this.cellSize * col, this.height);
        context.stroke();
      }

      // Draw grid rows
      for (let row = 0; row < this.rows; row++) {
        context.beginPath();
        context.moveTo(0, this.cellSize * row);
        context.lineTo(this.width, this.cellSize * row);
        context.stroke();
      }
    });
  }

  render(context) {
    context.clearRect(0, 0, this.width, this.height);

    this.drawText(context);
    this.drawGrid(context);
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }
}
