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
    this.particles = [];
    this.numberOfParticles = 1000;

    if (window.matchMedia('(max-width: 650px)').matches) {
      this.numberOfParticles = 500;
    }

    console.log(this.numberOfParticles)
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }

  init() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this, i));
    }
  }

  render(context, elapsedTime) {
    context.clearRect(0, 0, this.width, this.height);

    this.particles.forEach((particle) => {
      particle.update(elapsedTime);
      particle.draw(context, elapsedTime);
    });
  }
}

class Particle {
  constructor(effect, index) {
    this.index = index;
    this.effect = effect;
    this.spacing = 20;
    this.size = Math.floor(Math.random() * 20 + 8);
    this.y = -Math.floor(Math.random() * this.spacing * 10);
    this.x = this.pickColumn();
    this.speedY = this.pickSpeed();
    this.morphFrequency = this.pickMorphFrequency();
    this.letter = 'A';
    this.currentAge = 0;
    this.maxAge = this.pickMaxAge();
  }

  update(elapsedTime) {
    // make the particles rotate around the canvas
    // use sin to make the particles move in a circle
    this.y += this.speedY;
    this.currentAge++;

    if (this.currentAge > this.maxAge) {
      this.y = -this.pickStartingPoint();
      this.x = this.pickColumn();
      this.speedY = this.pickSpeed();
      this.morphFrequency = this.pickMorphFrequency();
      this.currentAge = 0
      this.maxAge = this.pickMaxAge();
    }

    // Time to change the letter on this particle
    if (parseInt(elapsedTime) % this.morphFrequency === 0) {
      this.letter = getRandomLetter();
      this.morphFrequency = this.pickMorphFrequency();
    }

    // particle is off-screen, reset it
    if (this.y > this.effect.height + this.spacing) {
      this.y = -this.pickStartingPoint();
      this.x = this.pickColumn();
      this.speedY = this.pickSpeed();
      this.morphFrequency = this.pickMorphFrequency();
      this.size = Math.floor(Math.random() * 20 + 10);
      this.maxAge = this.pickMaxAge();
    }
  }

  pickStartingPoint() {
    const startingPointChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      this.spacing *
      startingPointChoices[
        Math.floor(Math.random() * startingPointChoices.length)
      ]
    );
  }

  pickMaxAge() {
    return Math.floor(Math.random() * 300 + 100);
  }

  pickSpeed() {
    const speedChoices = [1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5];
    return speedChoices[Math.floor(Math.random() * speedChoices.length)];
  }

  pickColumn() {
    const columns = this.effect.width / this.spacing;
    const column = Math.floor(Math.random() * columns);
    return column * this.spacing + this.size * 0.5;
  }

  pickMorphFrequency() {
    const frequencyChoices = [10, 5, 8, 13, 15, 17, 20, 22, 25, 28, 31];
    return frequencyChoices[
      Math.floor(Math.random() * frequencyChoices.length)
    ];
  }

  draw(context, elapsedTime) {
    withContext(context, () => {
      // if ((parseInt(elapsedTime) % this.morphFrequency) - 1 === 0) {
      //   context.fillStyle = 'rgba(255,255, 255, 0.5)'
      //   context.clearRect(this.x, this.y, this.size, this.size)
      //   return
      // }
      context.fillStyle = 'rgba(100,255,50,.1)';

      if (this.maxAge - this.currentAge < 50) {
        context.fillStyle = `rgba(100,255,50,${
          (this.maxAge - this.currentAge) * 0.01
        })`;
      }

      // context.fillRect(this.x, this.y, this.size, this.size);
      context.font = `${this.size}px Arial`;
      context.fillText(this.letter, this.x, this.y - this.size * 0.01);
      context.fillText(this.letter, this.x, this.y - this.size * 0.03);
      context.fillText(this.letter, this.x, this.y - this.size * 0.05);
      context.fillText(this.letter, this.x, this.y);

      // context.font = '10px Arial'
      // context.fillText(this.index.toString(), this.x + this.spacing * .5, this.y + this.spacing * .5)
    });
  }
}
