class Peddle
{
  constructor(side, name)
  {
    this.name = name
    this.x = this.selectPosition(side);
    this.w = 20;
    this.h = 100;
    this.y = 200//height;
    this.vy = random([-2,2]);  
    this.nexttarget = false;
    this.dnexttarget = 0;
  }

  selectPosition(side)
  {
    if(side==="Left") return 10
    if(side==="Right") return 390
  }

  update()
  {
    if(this.y>=height-50 || this.y<=50)
    {
      this.vy *=-1;
    }
  }
  change_dir(y)
  {
    this.vy = y;
  }
  // Det er her i peddleAI.js=> move at I skal skrive noget kode der får jeres AI til at rykke sig
  // ballx, bally er boldens nuværende postition
  // ballxspeed, ballyspeed boldens velocity 
  // history er en liste af vektorer der pejer på de sidste 25 pkt bolden har været
  // Paddlex og Paddley er positionen af den anden paddle
  
  move(ballx,bally,ballxspeed, ballyspeed, history,Paddlex,Paddley) 
  {
    this.nexttarget = false;
    this.dnexttarget = false;
    let target = false;
    let dir = createVector(ballxspeed,ballyspeed);
    let point = createVector(ballx,bally);
    let pt;
    let counter = 0;
    let wall1 = {
      a: createVector(20,0),
      b: createVector(20,400)
    }
    let wall2 = {
      a: createVector(0,0),
      b: createVector(400,0)
    }
    let wall3 = {
      a: createVector(380,0),
      b: createVector(380,400)
    }
    let wall4 = {
      a: createVector(0,400),
      b: createVector(400,400)
    }
    while (counter <= 40){

      pt = this.raycasting(wall3,point,dir)
      if(pt != undefined){
        if(!target){
          target = pt
            dir.reflect(createVector(1,0));
            point = pt;
        }

        else if(target && !this.nexttarget ) {
          this.nexttarget = pt;

          dir.reflect(createVector(1,0))
          point = pt
        }
        
        
        else if(target && this.nexttarget && !this.dnexttarget ) {
          this.dnexttarget = pt;

          // dir.reflect(createVector(1,0))
          // point = pt
        }

        else if(this.nexttarget && target && this.dnexttarget){
          //fill("#0f0")
          //ellipse(400,target.y,20)
          //fill("#00f")
          //ellipse(400,this.nexttarget.y,20);
          //fill("#800080")
          //ellipse(400,this.dnexttarget.y,20)
        }

        //ellipse(pt.x,pt.y,20);
      }
      pt = this.raycasting(wall1,point,dir)
      if(pt != undefined){
        dir.reflect(createVector(1,0));
        point = pt;
        //ellipse(pt.x,pt.y,20);
      }
      pt = this.raycasting(wall2,point,dir)
      if(pt != undefined){
        dir.reflect(createVector(0,1));
        point = pt;
        //ellipse(pt.x,pt.y,20);
      }
      pt = this.raycasting(wall4,point,dir)
      if(pt != undefined){
        dir.reflect(createVector(0,1));
        point = pt;
        //ellipse(pt.x,pt.y,20);
      }
      counter++
   } 
  if(target.y-35>this.y){
    this.vy = 2
    this.y = this.y+this.vy
  }
  else if(target.y+35<this.y){
    this.vy = -2
    this.y = this.y + this.vy
  }
  else if(this.nexttarget.y-35>this.y){
  this.vy = 2
  this.y = this.y+this.vy
  }
  else if(this.nexttarget.y+35<this.y){
    this.vy = -2
    this.y = this.y + this.vy
  }
  else if(this.dnexttarget.y-35>this.y){
    this.vy = 2
    this.y = this.y+this.vy
    }
  else if(this.dnexttarget.y+35<this.y){
    this.vy = -2
    this.y = this.y + this.vy
  }
  }
  raycasting(wall, point, dir){
    let x1 = wall.a.x;
    let y1 = wall.a.y;
    let x2 = wall.b.x;
    let y2 = wall.b.y;

    let x3 = point.x;
    let y3 = point.y;
    let x4 = point.x + dir.x;
    let y4 = point.y + dir.y;

    let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) {
      return;
    }

    let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t > 0 && t < 1 && u > 0) {
      let pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else {
      return;
    }
  }

  show()
  {
    push()
    fill("#f00")
    rect(this.x,this.y,this.w,this.h);
    pop()
  }
  
}