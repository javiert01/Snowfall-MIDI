class Leaf {
  constructor(x, y, value) {
    this.position = createVector(x, y)
    this.mass = 1
    this.vel = createVector(0, 0)
    this.acc = createVector(0, 0)
    this.r = map(value, 36, 96, 20, 30)
    this.colors = [40,15,255];
    this.value = value
    this.canShow = false
    this.initialAnimationDuration = 300
    this.fallingAnimationDuration = 400
    this.isFalling = false
  }

  initialAnimationFinished() {
    return this.initialAnimationDuration < 0
  }

  fallingAnimationFinished() {
    return this.fallingAnimationDuration < 0
  }

  applyForce(force) {
    this.acc.add(force)
  }

  changeColor(color) {
    this.colors = [...color];
  }

  update() {
    if (this.canShow) {
      this.initialAnimationDuration -= 5
    }
    if (this.isFalling) {
      this.fallingAnimationDuration -= 5
    }
    this.vel.add(this.acc)
    this.position.add(this.vel)
  }

  show() {
    if (!this.canShow) {
      return
    }
    noStroke()
    if (!this.initialAnimationFinished()) {
      let size = map(this.initialAnimationDuration, 0, 200, this.r, this.r + 20)
      fill(this.colors[0],this.colors[1], this.colors[2]  )
      ellipse(this.position.x, this.position.y, size + 5, size)
      return
    }
    if (!this.isFalling) {
      fill(this.colors[0],this.colors[1], this.colors[2], 150)
      ellipse(this.position.x, this.position.y, this.r + 5, this.r)
      return
    }
    let size = map(this.fallingAnimationDuration, 0, 500, this.r, this.r + 20)
    let color = map(this.fallingAnimationDuration, 0, 400, 90, 150)
    fill(color)
    ellipse(this.position.x, this.position.y, size + 5, size)
  }
}
