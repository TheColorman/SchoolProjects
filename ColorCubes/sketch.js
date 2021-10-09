// VSCode instellisense varible/function autocompletion:
/// <reference path="../../p5js/config/p5.global-mode.d.ts" />

let vertical;
let horizontal;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  rectMode(RADIUS);

  vertical = height/100;
  horizontal = width/100;
}

function draw() {
  background(200);
  for (var i = 0; i < horizontal; i++) {
    for (var j = 0; j < vertical; j++) {
      fill(mouseX/width*100*i/10, mouseY/height*100*j/10, 100);
      rect(width/horizontal*i, height/vertical*j, width/2-mouseX, height/2-mouseY);
    }
  }
}