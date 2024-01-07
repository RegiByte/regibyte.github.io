import { getInitialColors, getInitialText } from './helpers';

let canvasEffect = {
  canvas: null,
  context: null,
  effect: null,
};

let effect;
const initialText = getInitialText('Hello World');
const initialColors = getInitialColors(['red', 'blue', 'fuchsia']);

export const setupEffect = () => {
  canvasEffect.canvas = document.getElementById('canvas-1');
  canvasEffect.context = canvasEffect.canvas.getContext('2d', {
    willReadFrequently: true,
  });
  canvasEffect.canvas.width = window.innerWidth;
  canvasEffect.canvas.height = window.innerHeight;
  canvasEffect.context.fillStyle = 'white';

  canvasEffect.effect = new Effect(
    canvasEffect.context,
    canvasEffect.canvas.width,
    canvasEffect.canvas.height,
    'Helvetica',
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
    canvasEffect.effect.resize(window.innerWidth, window.innerHeight);
    canvasEffect.effect.render();
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
  originX;
  originY;
  size;
  color;

  /**
   * @param {Effect} effect
   * @param {number} x
   * @param {number} y
   * @param {string} color
   */
  constructor(effect, x, y, color) {
    this.effect = effect;
    this.color = color;
    this.originX = x;
    this.originY = y;
    this.ctx = this.effect.ctx;
    this.x = Math.random() * this.effect.canvasWidth;
    this.y = Math.random() * this.effect.canvasHeight;
    this.size = this.effect.gap;
    this.dx = 0;
    this.dy = 0;
    this.vx = 0; // velocity x
    this.vy = 0; // velocity y
    this.force = 0;
    this.angle = 0;
    this.distance = 0;
    this.friction = Math.random() * 0.9 + 0.08;
    this.ease = Math.random() * 0.1 + 0.005;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
    // this.ctx.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI);
    // this.ctx.fill();
  }

  update() {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy;
    this.force = (-this.effect.mouse.radius / this.distance) * this.effect.mouse.pushForce;

    if (this.distance < this.effect.mouse.radius && this.effect.mouse.pressed) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    } else {
      this.vx *= this.friction;
      this.vy *= this.friction;
    }

    this.x += this.vx * this.friction + (this.originX - this.x) * this.ease;
    this.y += this.vy * this.friction + (this.originY - this.y) * this.ease;
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
  fontSize = 120;
  lineHeight;
  maxTextWidth;
  particles = [];
  gap = 2;
  mouse = {
    pressed: false,
    radius: 5000,
    pushForce: .5,
    x: 0,
    y: 0,
  };
  gradient; // to render the text

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
    this.text = text;
    this.colors = colors;

    window.addEventListener('mousemove', (event) => {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
    });

    window.addEventListener('mousedown', () => {
      this.mouse.pressed = true;
    })

    window.addEventListener('mouseup', () => {
      this.mouse.pressed = false;
    })

    window.addEventListener('touchmove', (event) => {
      this.mouse.x = event.touches[0].clientX;
      this.mouse.y = event.touches[0].clientY;
    })

    window.addEventListener('touchstart', (event) => {
      this.mouse.pressed = true;
      this.mouse.x = event.touches[0].clientX;
      this.mouse.y = event.touches[0].clientY;
    })

    window.addEventListener('touchend', () => {
      this.mouse.pressed = false;
    })

    if (this.text.trim().length > 0) {
      this.wrapText(this.text);
    }
  }

  init() {}

  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    canvasEffect.canvas.width = width;
    canvasEffect.canvas.height = height;
    this.textX = this.canvasWidth / 2;
    this.textY = this.canvasHeight / 2;
    this.maxTextWidth = this.canvasWidth * 0.8; // 80% of available space
    this.gradient = null;
    this.wrapText(this.text);
  }

  wrapText(text) {
    this.text = text;
    this.clearCanvas();

    const gradient1 = this.getGradient();
    const { ctx } = this;
    ctx.font = `${this.fontSize}px ${this.font}`;
    ctx.fillStyle = gradient1;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';

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
    linesArray.forEach((line, index) => {
      const cleanLine = line.trim();
      ctx.fillText(
        cleanLine,
        this.canvasWidth / 2,
        textY + this.lineHeight * index,
      );
    });

    this.convertToParticles();
  }

  convertToParticles() {
    this.particles = [];
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight,
    );
    this.clearCanvas();
    const pixels = imageData.data;
    for (let y = 0; y < this.canvasHeight; y += this.gap) {
      for (let x = 0; x < this.canvasWidth; x += this.gap) {
        const index = (y * this.canvasWidth + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 0) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const color = `rgb(${red}, ${green}, ${blue})`;
          this.particles.push(new Particle(this, x, y, color));
        }
      }
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  getGradient() {
    if (!this.gradient) {
      const gradient = this.ctx.createLinearGradient(
        0,
        0,
        this.canvasWidth * .8,
        this.canvasHeight * .8,
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
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
  }
}
