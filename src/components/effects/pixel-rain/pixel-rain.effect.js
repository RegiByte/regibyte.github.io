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
  effect.init(image, ctx);
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
    this.imageBrightnessMap = [];
  }

  init(image, ctx) {
    this.image = image;
    this.particles = [];

    this.calculateImageBrightness(image, ctx);

    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  calculateImageBrightness(image, ctx) {
    withContext(ctx, () => {
      const ctx = canvas.getContext('2d');

      ctx.drawImage(image, 0, 0, image.width, image.height);

      const imageData = ctx.getImageData(0, 0, image.width, image.height);
      const data = imageData.data;
      let cellBrightness;

      for (let y = 0; y < this.height; y++) {
        let row = [];
        for (let x = 0; x < this.width; x++) {
          const red = data[y * 4 * imageData.width * (x * 4)];
          const green = data[y * 4 * imageData.width * (x * 4) + 1];
          const blue = data[y * 4 * imageData.width * (x * 4) + 2];
          const brightness = this.calculateRelativeBrightness(red, green, blue);
          const cell = [brightness];
          row.push(cell);
        }
        this.imageBrightnessMap.push(row);
      }

    });
  }

  calculateRelativeBrightness(red, green, blue) {
    return Math.sqrt(
      red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114,
    );
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }

  render(context) {
    context.globalAlpha = 0.05;
    context.fillStyle = 'rgb(0,0,0)';
    context.fillRect(0, 0, this.width, this.height);

    withContext(context, (ctx) => {
      ctx.drawImage(this.image, 0, 0, this.width, this.height);
    });

    this.particles.forEach((particle) => {
      particle.update();
      particle.render(context);
    });
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
    this.roundX = Math.floor(this.x)
    this.roundY = Math.floor(this.y)
  }

  update() {
    this.roundX = Math.floor(this.x)
    this.roundY = Math.floor(this.y)
    this.speed = this.effect.imageBrightnessMap[this.roundY][this.roundX][0];
    let movement = (2.5 - this.speed) + this.velocity;

    this.y += movement;

    if (this.y >= this.effect.height) {
      this.y = 0;
      this.x = Math.random() * this.effect.width;
    }
  }

  render(context) {
    withContext(context, (ctx) => {
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}
