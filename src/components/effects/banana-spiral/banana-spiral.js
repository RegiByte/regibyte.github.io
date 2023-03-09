import bananaImage from '../../../assets/images/effects/banana.png';

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

export const setupEffect = () => {
  canvas = document.getElementById('canvas-1');
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const image = new Image();
  image.src = bananaImage;

  effect = new Effect(canvas.width, canvas.height, image);
  effect.init();
  effect.render(ctx);


  function animate() {
    effect.render(ctx);

    requestAnimationFrame(animate);
  }

  image.onload = () => {
    animate();
  };
};

export const onUpdateBananasCount = (bananasCount) => {
  if (effect) {
    console.log('updating bananas conut')
    effect.particleCount = bananasCount;
    effect.init();
  }
}

export const clearEffect = () => {
  // TODO: implement clear function
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

export const resizeEffect = () => {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  if (effect) {
    effect.resize(canvas.width, canvas.height);
  }
};

class Effect {
  constructor(width, height, image) {
    this.width = width;
    this.height = height;
    this.particleCount = 50;
    this.particles = [];
    this.image = image;
    this.colors = [
      '#7c3aed',
      '#8b5cf6',
      '#c026d3',
      '#881337',
      '#22d3ee',
      '#2dd4bf',
      '#f72585',
      '#b5179e',
      '#7209b7',
      '#560bad',
    ];
  }

  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }

  drawCp(ctx, x, y) {
    withContext(ctx, () => {
      ctx.beginPath();
      ctx.strokeStyle = 'white';
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  init() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this));
    }
  }

  render(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);

    this.particles.forEach((particle) => {
      particle.update();
      particle.draw(ctx);
    });
  }
}

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.size = Math.random() * 30 + 10;
    this.color = this.effect.getRandomColor();
    this.x = this.size;
    this.y = this.size;
    this.speedX = this.size * Math.random() * 0.1 + 0.5;
    this.forceX = 50;
    this.forceY = 100;
  }

  update() {
    this.x += this.speedX;
    this.y =
      this.effect.height / 2 +
      Math.sin(this.x / this.forceX) * this.forceY +
      this.size;

    if (this.x > this.effect.width + this.size) {
      this.x = -this.size;
      this.y = this.size;
      this.color = this.effect.getRandomColor();
      this.speedX = this.size * Math.random() * 0.1 + 0.5;
      this.forceY = Math.random() * 100 + 70
      // this.forceX = Math.random() * 50 + 30
    }

    if (this.x < -this.size) {
      this.x = this.effect.width + this.size;
      this.y = this.size;
      this.color = this.effect.getRandomColor();
    }

    if (this.y > this.effect.height + this.size) {
      this.x = this.size;
      this.y = -this.size;
      this.color = this.effect.getRandomColor();
    }

    if (this.y < -this.size) {
      this.x = this.size;
      this.y = this.effect.height + this.size;
      this.color = this.effect.getRandomColor();
    }
  }

  draw(ctx) {
    withContext(ctx, () => {
      // ctx.beginPath();
      // ctx.fillStyle = this.color;
      // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      // ctx.fill();
      ctx.drawImage(this.effect.image, this.x, this.y, this.size, this.size)
    });
  }
}
