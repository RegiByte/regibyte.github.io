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

  const effect = new Effect(canvas.width, canvas.height);
  effect.init();
  effect.render(ctx);

  function animate() {
    effect.render(ctx);

    requestAnimationFrame(animate);
  }

  animate();
};

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
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.particleCount = 20;
    this.particles = [];
    this.colors = ['#7c3aed', '#8b5cf6', '#c026d3', '#881337','#22d3ee', '#2dd4bf'];
  }

  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }

  init() {

  }

  render(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);


  }
}

