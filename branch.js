class Branch {
  constructor(begin, end) {
    this.begin = begin
    this.end = end
    this.finished = false
  }

  show() {
    let len = dist(this.begin.x, this.begin.y, this.end.x, this.end.y)
    if (len > 20) {
      strokeWeight(map(len, 10, 100, 3, 15))
      stroke(102, 51, 0)
      line(this.begin.x, this.begin.y, this.end.x, this.end.y)
    } else {
      let offset = 0;
      let r = 80 + offset;
      let g = 120 + offset;
      let b = 40 + offset;
      fill(r,g,b, 150)
      noStroke();
      ellipse(this.begin.x, this.begin.y, 20, 25)
      /* beginShape();
      for(let i = 45; i < 135; i++) {
        let rad = 15;
        let x = rad * cos(i);
        let y = rad * sin(i);
        vertex(x,y)
      }
      for(let i = 135; i > 40; i--) {
        let rad = 15;
        let x = rad * cos(i);
        let y = rad * sin(-i) + 20;
        vertex(x,y)
      }
      endShape(CLOSE); */
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
