let x;
let y;
let a;
let b;
let d;
let speed;
let r;

let xcat;
let ycat;
let acat;
let dcat;
let speedcat;
let rcat;

function setup() {
  createCanvas(windowWidth, windowHeight);
  d = random(25, 100);
  dcat = random(50, 200);
  r = d/2;
  rcat = dcat/2;
  x = random(0+r, windowWidth-r);
  xcat = random(0+r, windowWidth-r);
  y = random(0+r, windowHeight-r);
  ycat = random(0+r, windowHeight-r);
  a = 0;
  acat = random(0, 1);
  b = 0;
  bcat = random(0, 1);
  speed = random(1, 10);
  speedcat = random(1, 10);
}

function draw() { 
  background(220);
  move();
  movecat();
  detect_collision();
}

function move() {

  if (x <= windowWidth-r && keyIsDown(RIGHT_ARROW)) {
    x += 1*speed;
  }
  if (x >= 0+r && keyIsDown(LEFT_ARROW)) {
    x += -1*speed; 
  }
  if (y <= windowHeight-r && keyIsDown(DOWN_ARROW)) {
    y += 1*speed;
  }
  if (y >= 0+r && keyIsDown(UP_ARROW)) {
    y += -1*speed;
  }
  fill(100);
  ellipse(x, y, d);
}

function movecat() {
  if (xcat >= windowWidth - rcat || xcat <= 0 + r) {
    acat *= -1;
    xcat += speedcat*2*acat;
  }
  if (ycat >= windowHeight - rcat || ycat <= 0 + r) {
    bcat *= -1;
    ycat += speedcat*2*bcat;
  }
  xcat += speedcat*acat;
  ycat += speedcat*bcat;
  fill(252, 186, 3);
  console.log(xcat, ycat, dcat, acat, bcat, speedcat);
  ellipse(xcat, ycat, dcat);
}

function detect_collision() {
    if (dist(x, y, xcat, ycat) <= r + rcat) {
      text('YOU LOSE', windowWidth/2, windowHeight/2);
    }
}