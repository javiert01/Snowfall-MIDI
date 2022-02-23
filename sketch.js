let notes = []
let snow = []
let spridesheet
let textures = []
let tree = []
let leaves = []
let count = 0
let gravity
let zOff = 0

function preload() {
  if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI yes!')
  } else {
    console.log('WebMIDI is not supported in this browser')
  }
  spridesheet = loadImage('flakes32.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  for (let x = 0; x < spridesheet.width; x += 32) {
    for (let y = 0; y < spridesheet.height; y += 32) {
      let img = spridesheet.get(x, y, 32, 32)
      image(img, x, y)
      textures.push(img)
    }
  }
  for (let i = 0; i < 500; i++) {
    let x = random(width)
    let y = random(height)
    let design = random(textures)
    snow.push(new Snowflake(x, y, design))
  }
  gravity = createVector(0, 0.05)
  let a = createVector(width / 2, height - 75)
  let b = createVector(width / 2, height - 225)
  let root = new Branch(a, b)
  tree[0] = root
  for (let i = 0; i < 500; i++) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA())
      tree.push(tree[i].branchB())
    }
    tree[i].finished = true
  }
  //navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure)
}

function draw() {
  background(0)
  noStroke()
  fill(175, 175, 175)
  rect(0, height - 150, width, 150)
  fill(156, 76, 0)
  ellipse(width / 2, height - 75, 170, 70)
  zOff += 0.1
  for (let branch of tree) {
    branch.show()
  }
  for (let flake of snow) {
    let xOff = flake.pos.x / width
    let yOff = flake.pos.y / height
    let wAngle = noise(xOff, yOff, zOff) * TWO_PI
    let wind = p5.Vector.fromAngle(wAngle)
    wind.mult(0.01)

    flake.applyForce(gravity)
    flake.applyForce(wind)
    flake.update()
    flake.show()
  }
}

function onMIDISuccess(midiAccess) {
  for (let input of midiAccess.inputs.values()) {
    input.onmidimessage = getMIDIMessage
  }
}

function onMIDIFailure() {
  console.log('Could not access your MIDI devices.')
}

function getMIDIMessage(message) {
  var command = message.data[0]
  var note = message.data[1]
  var velocity = message.data.length > 2 ? message.data[2] : 0 // a velocity value might not be included with a noteOff command

  switch (command) {
    case 144: // noteOn
      if (velocity > 0) {
        noteOn(note, velocity)
      } else {
        noteOff(note)
      }
      break
    case 128: // noteOff
      noteOff(note)
      break
    // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
  }
}

function noteOn(note) {
  let x = random(50, width - 50)
  let y = random(50, height - 50)
  console.log('The note is://', x, y, note)
  notes.push(new Note(x, y, note))
}

function noteOff(note) {
  for (let i = notes.length - 1; i >= 0; i--) {
    notes.splice(i, 1)
  }
}
