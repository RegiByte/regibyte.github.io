let canvas
let ctx
let canvasWidth
let canvasHeight

export const setupEffect = () => {
  canvas = document.getElementById('canvas-1')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.fillStyle = 'white'

  const effect = new Effect(canvas.width, canvas.height)
  effect.init()
  effect.render(ctx)
}

export const resizeEffect = () => {
  if (canvas) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  canvasWidth = window.innerWidth
  canvasHeight = window.innerHeight
}

export const clearEffect = () => {
  // TODO: implement clear function
}

class Particle {
  constructor(effect) {
    this.effect = effect
    this.x = Math.floor(Math.random() * this.effect.width)
    this.y = Math.floor(Math.random() * this.effect.height)
  }

  draw(context) {
    context.fillRect(this.x, this.y, 10, 10)
  }
}

class Effect {
  constructor(width,height) {
    this.width = width
    this.height = height
    this.particles = []
  }

  init() {
    for(let i = 0; i <50; i++) {
      this.particles.push(new Particle(this))
    }
  }

  render(context) {
    this.particles.forEach((particle) => {
      particle.draw(context)
    })
  }
}