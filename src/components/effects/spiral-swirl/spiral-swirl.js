let canvas;
let ctx;
let canvasWidth;
let canvasHeight;
let effect;
let gradient1

function withContext(context, fn) {
  context.save();
  fn(context);
  context.restore();
}

function getRandomLetter() {
  const letterOptions =
    'abcdefghijklmnopqrstuvwxyz1234567890#&!ぁあかがきたぞそぜほぱばヅオゑбгджзйфцчщыэюя';

  return letterOptions[Math.floor(Math.random() * letterOptions.length)];
}

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

  /** Global Config */
  gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient1.addColorStop('.2', '#f87171');
  gradient1.addColorStop('.3', '#f97316');
  gradient1.addColorStop('.4', '#a3e635');
  gradient1.addColorStop('.5', '#34d399');
  gradient1.addColorStop('.6', '#38bdf8');
  gradient1.addColorStop('.7', '#a78bfa');
  gradient1.addColorStop('.8', '#e879f9');

  ctx.strokeStyle = gradient1

  ctx.shadowOffsetX = 2
  ctx.shadowOffsetY = 2
  ctx.shadowColor = 'white'
  /** Global Config */

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
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  if (effect) {
    effect.resize(canvasWidth, canvasHeight);
  }
};

export const clearEffect = () => {
  // TODO: implement clear function
};

class Effect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.lines = [];
    this.numberOfLines = 50;
  }

  resize(width, height) {
    // this.width = width;
    // this.height = height;
    // this.init()
  }

  init() {
    // Create lines
    this.lines = []
    for (let i = 0; i < this.numberOfLines; i++) {
      this.lines.push(new Line(this, i));
    }
  }

  render(context, elapsedTime) {
    context.clearRect(0, 0, this.width, this.height);

    // Update and draw lines
    this.lines.forEach((line) => {
      line.update(elapsedTime);
      line.draw(context, elapsedTime);
    });
  }
}

class Line {
  constructor(effect, index) {
    this.index = index;
    this.effect = effect;
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
    this.history = [
      {
        x: this.x,
        y: this.y,
      },
    ];
    this.lineWidth = Math.floor(Math.random() * 15 + 1);
    this.maxLength = Math.floor(Math.random() * 200 + 10);
    this.lifeSpan = this.maxLength * 2;
    this.breakLine = this.lifeSpan * 0.9;
    this.timer = 0;
    this.angle = 0;
    this.angleVelocity = Math.random() * 0.5 - 0.25;
    this.curve = 0.1;
    this.curveVelocity = Math.random() * 0.4 - 0.2;
  }

  update(elapsedTime) {
    this.timer++;
    this.angle += this.angleVelocity;
    this.curve += this.curveVelocity;

    if (this.timer < this.lifeSpan) {
      // If we are at 80% of the lifespan, reverse the angle velocity
      // this will make the spirals to follow a semi-straight path
      if (this.timer > this.breakLine) {
        this.angleVelocity *= -1.12;
      }

      this.x += Math.sin(this.angle) * this.curve;
      this.y += Math.cos(this.angle) * this.curve;
      this.history.push({
        x: this.x,
        y: this.y,
      });
      if (this.history.length > this.maxLength) {
        this.history.shift();
      }
    } else if (this.history.length <= 1) {
      this.reset();
    } else {
      this.history.shift();
    }
  }

  reset() {
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
    this.history = [
      {
        x: this.x,
        y: this.y,
      },
    ];
    this.timer = 0;
    this.lineWidth = Math.floor(Math.random() * 15 + 1);
    this.angle = 0;
    this.curve = 0;
    this.curveVelocity = Math.random() * 0.4 - 0.2;
    this.angleVelocity = Math.random() * 0.5 - 0.25;
    this.breakLine = this.lifeSpan * 0.9;
    this.maxLength = Math.floor(Math.random() * 200 + 10);
    this.lifeSpan = this.maxLength * 2;
  }

  draw(context, elapsedTime) {
    withContext(context, () => {
      const { history } = this;
      context.lineWidth = this.lineWidth;
      context.beginPath();
      context.moveTo(history[0].x, history[0].y);
      for (let i = 1; i < history.length; i++) {
        context.lineTo(history[i].x, history[i].y);
      }
      context.stroke();
    });
  }
}

class Particle {
  constructor(effect, index) {
    this.index = index;
    this.effect = effect;
  }

  update(elapsedTime) {}

  draw(context, elapsedTime) {
    withContext(context, () => {
      context.fillRect(
        this.effect.width / 2 + this.index * 5,
        this.effect.height / 2 + this.index * 5,
        10,
        10,
      );
    });
  }
}
