class Ball
{
  constructor()
  {
    this.START_SPEED = 4;
    this.x = 200;
    this.y = 100;
    this.w = 20;
    let a = random(-PI/4,PI/4)+random([0,PI]);
    this.vx = cos(a)*this.START_SPEED;
    this.vy = sin(a)*this.START_SPEED;
    this.history=[]//contains the 25 points from the last 25 frames
  }
  
  move()
  {
    this.y +=this.vy;
    this.x +=this.vx;
  } 
  
  update()
  {
    if(this.y>=height || this.y<=0)
    {
      this.vy *= -1;
    }
    let v = createVector(this.x, this.y)
    
    if(this.history.length>25)
    {
      this.history=this.history.slice((1, 26))
    }
    this.history.push(v)

  }
  reset()
  {
    this.history = [];
    this.x = 200;
    this.y = 100;
    let a = random(-PI/4,PI/4)+random([0,PI]);
    this.vx = cos(a)*this.START_SPEED;
    this.vy = sin(a)*this.START_SPEED;
  }
  show()
  {
    fill(255);
    noStroke();
    ellipse(this.x,this.y,this.w);
  }
}