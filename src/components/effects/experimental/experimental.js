let canvas;
let ctx;
let effect;

function withContext(context, fn) {
  context.save();
  fn(context);
  context.restore();
}

// This function is called externally to setup the effect
export const setupEffect = () => {
  canvas = document.getElementById('canvas-1');
  ctx = canvas.getContext('2d', {
    alpha: true,
  });
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = 'white';

  effect = new Effect(canvas.width, canvas.height);
  let startTime, previousTimeStamp;
  effect.init();
  effect.render(ctx, 0);

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    if (previousTimeStamp !== timestamp) {
      previousTimeStamp = timestamp;
    }

    // elapsed time is undefined on the first call
    // elapsed time is converted to seconds.
    if (!isNaN(elapsed)) {
      effect.render(ctx, elapsed * 0.01);
    }

    requestAnimationFrame(animate);
  }

  animate();
};

export const resizeEffect = () => {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  if (effect) {
    effect.resize(canvas.width, canvas.height);
  }
};

export const clearEffect = () => {
  // TODO: implement clear function
};

class Effect {
  speed = 3

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.speed = 3;
    this.snake = new Snake(this);
    this.apple = new Apple();
  }

  init() {
    document.addEventListener('keydown', (event) => {
      let newDirection;
      switch (event.key) {
        case 'ArrowUp':
          newDirection = { x: 0, y: -this.speed };
          break;
        case 'ArrowDown':
          newDirection = { x: 0, y: this.speed };
          break;
        case 'ArrowLeft':
          newDirection = { x: -this.speed, y: 0 };
          break;
        case 'ArrowRight':
          newDirection = { x: this.speed, y: 0 };
          break;
      }
      if (newDirection) {
        this.snake.changeDirection(newDirection);
      }
    });
  }

  render(context, elapsedTime) {
    context.clearRect(0, 0, this.width, this.height);

    this.snake.move();
    if (
      this.snake.body[0].x === this.apple.position.x &&
      this.snake.body[0].y === this.apple.position.y
    ) {
      this.snake.grow();
      this.apple.relocate();
    }

    this.snake.draw(context);
    this.apple.draw(context);
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }
}

class Snake {
  constructor(effect) {
    this.body = [
      { x: 10, y: 10 },
      { x: 20, y: 10 },
      { x: 30, y: 10 },
    ];
    this.effect = effect;
    this.direction = { x: this.effect.speed, y: 0 };
  }

  move() {
    const head = {
      x: this.body[0].x + this.direction.x,
      y: this.body[0].y + this.direction.y,
    };
    this.body.unshift(head);
    this.body.pop();
  }

  changeDirection(newDirection) {
    this.direction = newDirection;
  }

  grow() {
    this.body.push(this.body[this.body.length - 1]);
  }

  draw(context) {
    context.fillStyle = 'green';
    this.body.forEach((part) => {
      context.fillRect(part.x, part.y, 10, 10);
    });
  }
}

class Apple {
  constructor() {
    this.position = { x: 50, y: 50 };
  }

  relocate() {
    this.position = {
      x: Math.floor(Math.random() * 30) * 10,
      y: Math.floor(Math.random() * 30) * 10,
    };
  }

  draw(context) {
    context.fillStyle = 'red';
    context.fillRect(this.position.x, this.position.y, 10, 10);
  }
}
