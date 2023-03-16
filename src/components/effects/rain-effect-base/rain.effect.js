/** A program that takes an image and turns it into a pixel rain*/
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
  effect.init(image);
  effect.render(ctx);

  function animate() {
    effect.render(ctx);

    requestAnimationFrame(animate);
  }

  image.onload = () => {
    animate();
  };
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

export const clearEffect = () => {
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

export const onUpdateImage = (image) => {
  console.log(image);
};

class Effect {
  constructor(width, height, image) {
    this.width = width;
    this.height = height;
    this.image = image;
    this.particles = [];
    this.numberOfParticles = 5000;
  }

  init(image) {
    this.image = image;
    this.particles = [];

    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }

  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }

  render(context) {
    context.globalAlpha = 0.05;
    context.fillStyle = 'rgb(0,0,0)';
    context.fillRect(0, 0, this.width, this.height);

    this.particles.forEach((particle) => {
      particle.update();
      particle.render(context);
    })

    // withContext(context, (ctx) => {
    //   ctx.drawImage(this.image, 0, 0, this.width, this.height);
    // });
  }
}

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.x = Math.random() * this.effect.width;
    this.y = 0;
    this.speed = 0;
    this.velocity = Math.random() * 3.5;
    this.size = Math.random() * 1.5 + 1;
  }

  update() {
    this.y += this.velocity;

    if (this.y >= this.effect.height) {
      this.y = 0;
      this.x = Math.random() * this.effect.width;
    }
  }

  render(context) {
    withContext(context, (ctx) => {
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}
