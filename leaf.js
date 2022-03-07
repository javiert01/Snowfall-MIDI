class Leaf {
  constructor(x, y, value) {
    this.position = createVector(x, y)
    this.mass = 1
    this.vel = createVector(0, 0)
    this.acc = createVector(0, 0)
    this.r = map(value, 36, 96, 20, 30)
    this.value = value
    this.canShow = false
    this.initialAnimationDuration = 300
  }

  initialAnimationFinished() {
    return this.initialAnimationDuration < 0
  }

  applyForce(force) {
    this.acc.add(force)
  }

  update() {
    if (this.canShow) {
      this.initialAnimationDuration -= 5
    }
    this.vel.add(this.acc)
    this.position.add(this.vel)
    // this.acc.mult(0)
  }

  show() {
    if (this.canShow) {
      if (!this.initialAnimationFinished()) {
        noStroke()
        let size = map(this.initialAnimationDuration, 0, 200, this.r, this.r + 20);
        fill(map(this.value, 36, 96, 0, 255), 15, 255, 200)
        ellipse(this.position.x, this.position.y, size + 5, size)
      } else {
        noStroke()
        fill(map(this.value, 36, 96, 0, 255), 15, 255, 150)
        ellipse(this.position.x, this.position.y, this.r + 5, this.r)
      }
    }
  }
}
