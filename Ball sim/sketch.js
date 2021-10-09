const circles = [];
const circleAmount = 100;
const colors = [
  "#eb4034",
  "#eb7d34",
  "#ebb434",
  "#ebc934",
  "#bf5906",
  "#fa3807",
  "#fa9907",
  "#f5427b",
  "#bd0202",
  "#fc3200"
]
const efficiency = 1.0;

// Clamp value
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
// Random between 2 numbers
const randomIntFromInterval = (min, max) =>  Math.floor(Math.random() * (max - min + 1) + min);

function setup(){
  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < circleAmount; i++) {

    const cl = colors[randomIntFromInterval(0, colors.length - 1)];
    const position = {
      x: randomIntFromInterval(0, width),
      y: randomIntFromInterval(0, height)
    }
    const direction = {
      a: randomIntFromInterval(-2, 2),
      b: randomIntFromInterval(-2, 2)
    }
    const radius = randomIntFromInterval(20, 60);
    const mass = radius / 10;
    circles.push(new Circle(cl, position, direction, radius, mass));
  }
}

function draw(){
  background("black");
  stroke("black");

  circles.forEach(circle => {
    circle.a *= efficiency;
    circle.b *= efficiency;

    if (mouseIsPressed) {
      const mouseVect = mouseButton === LEFT ? createVector(mouseX - circle.x, mouseY - circle.y) : createVector(circle.x - mouseX, circle.y - mouseY);
      console.log(mouseVect);
      mouseVect.div(500);
      circle.a += mouseVect.x;
      circle.b += mouseVect.y;
    }
    circle.render();
    circle.collisionCheck();
    circle.move();
    circles.forEach(circle2 => {
      if (circle === circle2) return;
      circle.ballCollide(circle2);
    })
  });
}

