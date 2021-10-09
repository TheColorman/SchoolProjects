let img;

function preload() {
  img = loadImage('./paddleaitexture.png');
}

let r_p;  // right paddle
let l_p;  // left paddle
let ball;
let prev_x = 0;

let score1 = 0;
let score2 = 0;
const SPEED_UP = 1.02;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  l_p= new Peddle("Left","The Runner");
  r_p = new PeddleAI("Right","The MeatBeater", img);
  ball = new Ball();
}

function mousePressed() {
  if (mouseX > 195 && mouseX < 205 && mouseY > 0 && mouseY < 11) {
    console.log("test")
    r_p.debugLines = !r_p.debugLines;
  }
}

function moveHuman() //left side can be moved manually using arrows
{
    l_p.vy = 0
    if(keyIsDown(UP_ARROW))
    {
      if(l_p.y<=50)
      {
        l_p.vy *=-1;
      }
      else {
        l_p.y-=2
      }
      
    }      
    if(keyIsDown(DOWN_ARROW))
    {
      if(l_p.y>=height-50)
      {
        l_p.vy *=-1;
      }
      else {
        l_p.y+=2
      }
    }
    
}
function draw() {
  background(0);
  textSize(20);
  text(l_p.name,30,50)
  text(score1,45,25);
  
  text(r_p.name,230,50)
  text(score2,340,25);

  moveHuman()   //uncomment to move left side manually
  
  l_p.move(ball.x,ball.y, ball.vx, ball.vy, ball.history,r_p.x,r_p.y);   //changes the y value using velocity
  r_p.move(ball.x,ball.y, ball.vx, ball.vy, ball.history,l_p.x,l_p.y); //AI movement
  r_p.update(); //checks if paddle is outside border
  l_p.update(); //checks if paddle is outside border
  l_p.show();  //show the paddle
  r_p.show();   //show the paddle
  
  ball.move();
  ball.show(); 
  ball.update();
  
  //if ball goes outside
  if (ball.x>=width)
  {
    score1++
    ball.reset();
    // l_p.y = 200;
    // r_p.y = 200;
  }
  if (ball.x<=0)
  {
    score2++;
    ball.reset();
    // l_p.y = 200;
    // r_p.y = 200;
  }

  //detect collision
  /*
  if(ball.x>=380 && ball.y<=(r_p.y+50) && ball.y>=(r_p.y-50))
  {
    ball.vx *=-1;
    ball.vx *= SPEED_UP;
    ball.vy *= SPEED_UP;
  }
  
  if(ball.x>=20 && ball.y<=(l_p.y+50) && ball.y>=(l_p.y-50))
  {
    ball.vx *=-1;
    ball.vx *= SPEED_UP;
    ball.vy *= SPEED_UP;
  }
  */
  let dy = 50;
  
  //detect collision
  if(ball.x >= 380 && prev_x < 380 && ball.y<=(r_p.y+dy) && ball.y>=(r_p.y-dy)) {
    ball.vx *=-1;
    ball.vx *= SPEED_UP;
    ball.vy *= SPEED_UP;
  }
  
  if(ball.x <= 20 && prev_x > 20 && ball.y<=(l_p.y+dy) && ball.y>=(l_p.y-dy)) {
    ball.vx *=-1;
    ball.vx *= SPEED_UP;
    ball.vy *= SPEED_UP;
  }
  prev_x = ball.x
  
}