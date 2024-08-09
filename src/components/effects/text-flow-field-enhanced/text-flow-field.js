import { getInitialColors, getInitialText } from './helpers';

let canvasEffect = {
  canvas: null,
  context: null,
  effect: null,
};

let effect;
const initialText = getInitialText('FLOW');
const initialColors = getInitialColors([
  '#fca5a5',
  '#ea580c',
  // '#365314',
  '#6ee7b7',
  '#f43f5e',
  // '#115e59',
  // '#f5d0fe',
  '#0ea5e9',
  // '#be185d',
]);

function withContext(context, fn) {
  context.save();
  fn(context);
  context.restore();
}

export const setupEffect = () => {
  canvasEffect.canvas = document.getElementById('canvas-1');
  canvasEffect.context = canvasEffect.canvas.getContext('2d', {
    willReadFrequently: true,
  });
  canvasEffect.canvas.width = 1500;
  canvasEffect.canvas.height = 600;
  canvasEffect.context.fillStyle = 'white';
  canvasEffect.context.strokeStyle = 'white';
  canvasEffect.context.lineWidth = 1;

  canvasEffect.effect = new Effect(
    canvasEffect.context,
    canvasEffect.canvas.width,
    canvasEffect.canvas.height,
    'Verdana',
    initialText,
    initialColors,
  );

  function animate() {
    canvasEffect.effect.clearCanvas();
    canvasEffect.effect.render();

    requestAnimationFrame(animate);
  }

  animate();
};

export const onEffectTextChange = (newText) => {
  if (canvasEffect.effect) {
    canvasEffect.effect.wrapText(newText);
    canvasEffect.effect.render();
  }
};

export const onEffectColorsChange = (newColors) => {
  if (canvasEffect.effect) {
    canvasEffect.effect.updateColors(newColors);
    canvasEffect.effect.render();
  }
};

export const resizeEffect = () => {
  if (canvasEffect.effect) {
    // canvasEffect.effect.resize(window.innerWidth, window.innerHeight);
    // canvasEffect.effect.render();
  }
};

export const clearEffect = () => {
  // TODO: implement clear function
};

function distanceBetweenParticles(particleA, particleB) {
  const dx = particleA.x - particleB.x;
  const dy = particleA.y - particleB.y;

  return dx * dx + dy * dy;
}

class Particle {
  effect;
  x;
  y;
  color;

  /**
   * @param {Effect} effect
   */
  constructor(effect) {
    this.effect = effect;
    this.ctx = this.effect.ctx;
    this.x = Math.random() * this.effect.canvasWidth;
    this.y = Math.random() * this.effect.canvasHeight;
    this.angle = 0;
    this.newAngle = 0;
    // this.angleCorrection = Math.random() * 0.5 + 0.01;
    this.angleCorrector = .042
    this.distance = 0;
    this.ease = Math.random() * 0.1 + 0.005;
    this.speedX = 0;
    this.speedY = 0;
    // this.speedModifier = Math.floor(Math.random() * 1.5 + .5);
    // this.speedModifier = Math.floor(Math.random() * 2 + 0.1);
    this.speedModifier = 0.3;
    this.history = [
      {
        x: this.x,
        y: this.y,
      },
    ];
    this.maxLength = Math.floor(Math.random() * 60 + 50);
    this.timer = this.maxLength * 2;
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  get size() {
    return this.effect.roundedCellSize;
  }

  get colors() {
    return this.effect.colors;
  }

  draw() {
    const { ctx } = this;
    withContext(ctx, () => {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      // ctx.globalAlpha = this.alpha;
      ctx.moveTo(this.history[0].x, this.history[0].y);
      let currentAlpha = 0.5;
      this.history.forEach((point, index) => {
        let newAlpha = point.alpha + .15;
        ctx.lineTo(point.x, point.y);
        currentAlpha = newAlpha;
      });
      ctx.globalAlpha = currentAlpha;
      ctx.stroke();

      // ctx.stroke()
    });
  }

  update() {
    this.timer--;
    if (this.timer >= 1) {
      let x = Math.floor(this.x / this.size);
      let y = Math.floor(this.y / this.size);
      let index = y * this.effect.cols + x;

      let flowFieldCell = this.effect.flowField[index];
      if (flowFieldCell) {
        this.newAngle = flowFieldCell.angle;
        this.alpha = flowFieldCell.alpha;
        if (this.angle > this.newAngle) {
          this.angle -= this.angleCorrector;
        } else if (this.angle < this.newAngle) {
          this.angle += this.angleCorrector;
        } else {
          this.angle = this.newAngle;
        }
      } else {
        this.reset();
      }

      this.speedX = Math.cos(this.angle);
      this.speedY = Math.sin(this.angle);
      this.x += this.speedX * this.speedModifier;
      this.y += this.speedY * this.speedModifier;

      this.history.push({
        x: this.x,
        y: this.y,
        alpha: this.alpha,
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
    let attempts = 0;
    let resetSuccess = false;

    while (attempts < 10 && !resetSuccess) {
      attempts++;
      let testIndex = Math.floor(Math.random() * this.effect.flowField.length);
      let targetCell = this.effect.flowField[testIndex];
      if (targetCell.alpha > 0) {
        this.x = targetCell.x;
        this.y = targetCell.y;
        this.history = [{ x: this.x, y: this.y, alpha: targetCell.alpha }];
        this.timer = this.maxLength * 2;

        resetSuccess = true;
      }
    }

    if (!resetSuccess) {
      this.x = Math.floor(Math.random() * this.effect.canvasWidth);
      this.y = Math.floor(Math.random() * this.effect.canvasHeight);
      this.history = [
        {
          x: this.x,
          y: this.y,
          alpha: 1,
        },
      ];
      this.timer = this.maxLength * 2;
    }

    // this.speedModifier = Math.floor(Math.random() * 2 + 0.1);
  }
}

class Effect {
  ctx;
  canvasWidth;
  canvasHeight;
  font;
  text = ''; // text to render
  textX;
  textY;
  fontSize = 150;
  lineHeight;
  maxTextWidth;
  particles = [];
  cellSize = 12;
  mouse = {
    pressed: false,
    radius: 5000,
    pushForce: 0.5,
    x: 0,
    y: 0,
  };
  gradient; // to render the text
  rows = 0;
  cols = 0;

  /**
   * @param {CanvasRenderingContext2D} context
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   * @param {string} font
   * @param {string} text
   */
  constructor(context, canvasWidth, canvasHeight, font, text, colors) {
    this.ctx = context;
    this.font = font;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.particles = [];
    this.text = text;
    this.textX = this.canvasWidth / 2;
    this.textY = this.canvasHeight / 2;
    this.lineHeight = this.fontSize * 0.9;
    this.maxTextWidth = this.canvasWidth * 0.8; // 80% of available space
    this.verticalOffset = -70; // I don't remember exactly what is this for
    this.numberOfParticles = 2000;
    this.text = text;
    this.colors = colors;
    this.debug = false;

    this.zoom = 0.42;
    this.curve = 21;

    this.init();
    this.setupEventListeners();
  }

  init() {
    if (this.text.trim().length > 0) {
      this.wrapText(this.text);
    }
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
    this.particles.forEach((p) => p.reset());
  }

  get roundedCellSize() {
    // take the cell size and make return it's size when divisible by the canvas width
    // reduce the size of the cell to make it fit the canvas width
    return this.cellSize;
  }

  setupEventListeners() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'd') {
        this.debug = !this.debug;
      }
    });

    window.addEventListener('mousemove', (event) => {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
    });

    window.addEventListener('mousedown', () => {
      this.mouse.pressed = true;
    });

    window.addEventListener('mouseup', () => {
      this.mouse.pressed = false;
    });

    window.addEventListener('touchmove', (event) => {
      this.mouse.x = event.touches[0].clientX;
      this.mouse.y = event.touches[0].clientY;
    });

    window.addEventListener('touchstart', (event) => {
      this.mouse.pressed = true;
      this.mouse.x = event.touches[0].clientX;
      this.mouse.y = event.touches[0].clientY;
    });

    window.addEventListener('touchend', () => {
      this.mouse.pressed = false;
    });
  }

  resize(width, height) {
    // this.canvasWidth = width;
    // this.canvasHeight = height;
    // canvasEffect.canvas.width = width;
    // canvasEffect.canvas.height = height;
    // this.textX = this.canvasWidth / 2;
    // this.textY = this.canvasHeight / 2;
    // this.maxTextWidth = this.canvasWidth * 0.8; // 80% of available space
    // this.gradient = null;
    // this.wrapText(this.text);
  }

  wrapText(text) {
    this.text = text;
    this.clearCanvas();

    this.drawText();
    this.drawTextStroke();

    this.convertToParticles();
  }

  convertToParticles() {
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight,
    );
    this.clearCanvas();
    this.flowField = [];
    this.particles = [];

    const pixels = imageData.data;

    this.cols = Math.floor(this.canvasWidth / this.roundedCellSize);
    this.rows = Math.floor(this.canvasHeight / this.roundedCellSize);

    for (let y = 0; y < this.canvasHeight; y += this.roundedCellSize) {
      for (let x = 0; x < this.canvasWidth; x += this.roundedCellSize) {
        const index = (y * this.canvasWidth + x) * 4;
        const alpha = pixels[index + 3];
        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const grayscale = (red + green + blue) * 0.333;
        let colorAngle = parseFloat(
          ((grayscale / 255) * Math.PI * 2).toFixed(2),
        ); // radians
        // const color = `rgb(${red}, ${green}, ${blue})`;
        // this.particles.push(new Particle(this, x, y, color));
        if (colorAngle < 0.1) {
          let inverse = Math.random() > 0.5 ? 1 : -1;
          colorAngle = inverse * Math.random() * 0.1;
        }
        this.flowField.push({
          x,
          y,
          angle: colorAngle,
          alpha,
        });
      }
    }

    this.createParticles();
  }

  getTextLines() {
    const { text, ctx } = this;

    let linesArray = [];
    let lineCounter = 0;
    let line = '';
    let words = text.split('');
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > this.maxTextWidth) {
        line = words[i] + ' ';
        lineCounter++;
      } else {
        line = testLine;
      }
      linesArray[lineCounter] = line;
    }

    let textHeight = this.lineHeight * lineCounter;
    const textY = this.canvasHeight / 2 - textHeight / 2 + this.verticalOffset;

    return [linesArray, textY];
  }

  drawText() {
    const gradient0 = this.getGradient();
    const { ctx, text } = this;

    withContext(ctx, () => {
      ctx.font = `bold ${this.fontSize}px ${this.font}`;
      ctx.fillStyle = gradient0;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineWidth = 1;
      // ctx.strokeStyle = 'white';
      const [linesArray, textY] = this.getTextLines();
      linesArray.forEach((line, index) => {
        const cleanLine = line.trim();
        ctx.fillText(
          cleanLine,
          this.canvasWidth / 2,
          textY + this.lineHeight * index,
        );
      });
    });
  }

  drawTextStroke() {
    const gradient0 = this.getGradient();
    const { ctx } = this;

    withContext(ctx, () => {
      ctx.font = `bold ${this.fontSize}px ${this.font}`;
      ctx.fillStyle = gradient0;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255,0,0, .2)';
      const [linesArray, textY] = this.getTextLines();
      linesArray.forEach((line, index) => {
        const cleanLine = line.trim();
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 10;
        ctx.fillStyle = `rgba(0, 0, 0, .1)`;
        ctx.fillText(
          cleanLine,
          this.canvasWidth / 2,
          textY + this.lineHeight * index,
        );
      });
    });
  }

  drawGrid() {
    // draw the flow field
    withContext(this.ctx, () => {
      this.ctx.strokeStyle = 'white';
      this.ctx.lineWidth = 0.3;

      for (let col = 0; col < this.cols; col++) {
        this.ctx.beginPath();
        this.ctx.moveTo(col * this.roundedCellSize, 0);
        this.ctx.lineTo(col * this.roundedCellSize, this.canvasHeight);
        this.ctx.stroke();
      }

      for (let row = 0; row < this.rows; row++) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, row * this.roundedCellSize);
        this.ctx.lineTo(this.canvasWidth, row * this.roundedCellSize);
        this.ctx.stroke();
      }
    });
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  getGradient() {
    if (!this.gradient) {
      const gradient = this.ctx.createLinearGradient(
        0,
        this.canvasHeight * 0.7,
        this.canvasWidth * 0.7,
        0,
      );

      const { colors } = this;
      // increment for color stops
      const stopPoints = colors.map((color, idx) => idx / (colors.length - 1));

      stopPoints.forEach((stopPoint, index) => {
        gradient.addColorStop(stopPoint, colors[index]);
      });

      this.gradient = gradient;
    }

    return this.gradient;
  }

  updateColors(colors) {
    this.gradient = null;
    this.colors = colors;
    this.wrapText(this.text);
  }

  render() {
    this.clearCanvas();

    if (this.debug) {
      this.drawText();
      this.drawGrid();
    }

    this.drawTextStroke();
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
  }
}
