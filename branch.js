class Branch {
  constructor(begin, end) {
    this.begin = begin
    this.end = end
    this.finished = false
  }
  
  getLen() {
    return dist(this.begin.x, this.begin.y, this.end.x, this.end.y)
  }

  show() {
    if (this.getLen() > 20) {
      strokeWeight(map(this.getLen(), 10, 100, 3, 15))
      stroke(102, 51, 0)
      line(this.begin.x, this.begin.y, this.end.x, this.end.y)
    } 
  }

  branchA() {
    let dir = p5.Vector.sub(this.end, this.begin)
    dir.rotate(PI / 6)
    dir.mult(random(0.7, 0.82))
    let newEnd = p5.Vector.add(this.end, dir)
    let b = new Branch(this.end, newEnd)
    return b
  }

  branchB() {
    let dir = p5.Vector.sub(this.end, this.begin)
    dir.rotate(-PI / 6)
    dir.mult(random(0.7, 0.82))
    let newEnd = p5.Vector.add(this.end, dir)
    let b = new Branch(this.end, newEnd)
    return b
  }
}
