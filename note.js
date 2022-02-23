class Note {
  constructor(x, y, value) {
    this.position = createVector(x,y);
    this.mass = 1
    this.vel = createVector(0, 0)
    this.acc = createVector(0, 0)
    this.r = map(value, 36, 96, 30, 60);
    this.value = value
  }

  applyForce(force) {
    this.acc.add(force)
  }

  update() {
    this.vel.add(this.acc)
    this.position.add(this.vel)
    this.acc.mult(0)
  }

  show() {
    noStroke();
    fill(map(this.value, 36,96, 0,255),15,255)
    rect(this.position.x, this.position.y, this.r - 10, this.r)
  }
}
