// VSCode instellisense varible/function autocompletion:
/// <reference path="../../../../p5js/config/p5.global-mode.d.ts" />

let country_select;
let g_width;  //global width and height for 2:3 aspect ratio
let g_height;

// Create selection box
function setup() {
  rectMode(CENTER);
  textAlign(CENTER);
  createCanvas(windowWidth, windowHeight);
  country_select = createSelect();
  country_select.position(width/2-65, height/8);
  country_select.option('Select country');
  country_select.option('Japan');
  country_select.option('France');
  country_select.option('Indonesia');
  country_select.option('Benin');
  country_select.option('Kuwait');
  country_select.option('Czech_Republic');
  country_select.option('Maldives');
  country_select.option('Israel');
  country_select.option('South_Africa');
  country_select.changed(updated);
  g_width = height/3*1.5;
  g_height = height/3;
}

// Run function based on current selection
function draw() {
  background(200);
  let country = country_select.value();
  if (country == 'Select country') {
    return
  }
  draw_country[country]();
}

function updated() {
  clear();  
}

  // Definition for flag placement: X: "width/2", Y: "height/2".
  // Definition for flag dimensions is: Width: "height/3*1.5", Height: "height/3". This results in a 2:3 aspect ratio.
  // Flag specification courtesy of https://fotw.info/
let draw_country = {
  Japan() {
    set_color(255);
    rect(width/2, height/2, g_width, g_height);
    set_color('#EF3340');
    ellipse(width/2, height/2, width/10, width/10);
  },
  France() {
    vertical_split('#EF4135', '#0055A4');
    set_color(255);
    rect(width/2, height/2, g_width/3, g_height+1); // For some reasen the colors underneath were visible at the top and bottom so I added 1 pixel
  },
  Indonesia() {
    horizontal_split('#FFFFFF', '#EF3340');
  },
  Benin() {   // Benin is supposed to be 1:2 ratio, but I can't be bothered to change it
    horizontal_split('#EE2737', '#FDDA24');
    set_color('#228848');
    rect(width/2-g_width/3.325, height/2, g_width/2.5, g_height+1);
  },
  Kuwait() {
    horizontal_split('#C8102E', '#00965E');
    spike('#000000', 0, 0, g_width*0.375);
    set_color(255);
    rect(width/2+g_width*0.125+0.5, height/2, g_width*0.75, g_height/3);
  },
  Czech_Republic() {
    horizontal_split('#E40046', '#FFFFFF');
    spike('#003087', 0, 0, g_width/2);
  },
  Maldives() {
    set_color('#C8102E');
    rect(width/2, height/2, g_width, g_height);
    set_color('#00843D');
    rect(width/2, height/2, g_width-g_height*0.5, g_height*0.5);
    set_color(255);
    ellipse(width/2+g_width*0.0625, height/2, g_height/3, g_height/3);
    set_color('#00843D');
    ellipse(width/2+g_width/9.6, height/2, g_height/3, g_height/3);
  },
  Israel() {
    set_color(255);
    rect(width/2, height/2, g_width, g_height);
    set_color('#005EB8');
    rect(width/2, height/2-g_height*0.328125, g_width, g_height*0.156);
    rect(width/2, height/2+g_height*0.328125, g_width, g_height*0.156);
    noFill();
    strokeWeight(g_height*0.034375);
    triangle(width/2, height/2-g_height*0.20625+g_height*0.03438, width/2-g_width*0.1125, height/2+g_height*0.09, width/2+g_width*0.1125, height/2+g_height*0.09);
    triangle(width/2, height/2+g_height*0.20625-g_height*0.03428, width/2-g_width*0.1125, height/2-g_height*0.09, width/2+g_width*0.1125, height/2-g_height*0.09);
  },
  South_Africa() {
    horizontal_split('#001489', '#E03C31');
    spike('#FFFFFF', g_width/5, 0, g_width*0.698);
    set_color('#FFFFFF');
    rect(width/2, height/2, g_width, g_height*0.335);
    spike('#007749', g_width*0.1216, 0, g_width*0.614);
    set_color('#007749');
    rect(width/2, height/2, g_width, g_height/5);
    spike('#FFB81C', 0, g_height*0.121, g_width*0.3765);
    spike('#000000', 0, g_height/5, g_width*0.298);
  }
}

function set_color(col) {
  stroke(col);
  fill(col);
}

function horizontal_split(col1, col2) {
  stroke(col1);
  fill(col1);
  rect(width/2, height/2+g_height/4, g_width, g_height/2);
  stroke(col2);
  fill(col2);
  rect(width/2, height/2-g_height/4, g_width, g_height/2);
}

function vertical_split(col1, col2) {
  stroke(col1);
  fill(col1);
  rect(width/2+g_height*1.5/4, height/2, g_width/2, g_height);
  stroke(col2);
  fill(col2);
  rect(width/2-g_height*1.5/4, height/2, g_width/2, g_height);
}

function spike(col, x_offset, y_offset, center) {
  stroke(col);
  fill(col);
  beginShape();
    vertex(width/2-g_width/2, height/2-g_height/2+y_offset);
    vertex(width/2-g_width/2+x_offset, height/2-g_height/2+y_offset);
    vertex(width/2-g_width/2+center, height/2);
    vertex(width/2-g_width/2+x_offset, height/2+g_height/2-y_offset);
    vertex(width/2-g_width/2, height/2+g_height/2-y_offset);
  endShape(CLOSE);
}