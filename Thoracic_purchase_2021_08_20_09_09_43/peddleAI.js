class PeddleAI {
    constructor(side, name, skin) {        
        this.skin = skin;
        this.name = name;
        this.x = this.selectPosition(side);
        this.w = 20;
        this.h = 100;
        this.y = 200; //height;
        image(this.skin, this.x-10, this.y - 50);
        this.vy = random([-2, 2]);
        this.debugLines = false;
    }

    selectPosition(side) {
        if (side === "Left") return 10;
        if (side === "Right") return 390;
    }

    update() {
        if (this.y >= height - 50 || this.y <= 50) {
            this.vy *= -1;
        }
    }
    change_dir(y) {
        this.vy = y;
    }
    // Det er her i peddleAI.js=> move at I skal skrive noget kode der får jeres AI til at rykke sig
    // ballx, bally er boldens nuværende postition
    // ballxspeed, ballyspeed boldens velocity
    // history er en liste af vektorer der pejer på de sidste 25 pkt bolden har været
    // Paddlex og Paddley er positionen af den anden paddle

    move(ballx, bally, ballxspeed, ballyspeed, history, Paddlex, Paddley) {

        
        //The chaser
        // Custom variables
        const paddleSpeed = 2;
        const retardMode = false;
        // Dont touch below here😳
        
        if (this.debugLines && retardMode) {
            stroke(0, 255, 0);
            line(0, height - 2, width, height - 2);
            line(0, height/3 * 2, width, height/3 * 2);
            line(0, height/3, width, height/3);
            line(0, 2, width, 2);
            stroke(255, 0, 0);
            line(width/2, 0, width/2, height);
            stroke(255);
        }
        if (retardMode && ballx < width/2) {
            if (bally > height/3 * 2) {
                return this.y += this.y > height/6 * 5 ? -paddleSpeed : paddleSpeed;
            } else if (bally > height / 3) {
                return this.y += this.y > height/6 * 3 ? -paddleSpeed : paddleSpeed;
            } else {
                return this.y += this.y > height/6 ? -paddleSpeed : paddleSpeed;
            }
        };
        let ballxVirtual = ballx;
        let ballyVirtual = bally;
        let ballvxVirtual = ballxspeed;
        let ballvyVirtual = ballyspeed;
        let iterations = 0;
        let moved = false;
        
        const calculateFutureBall = (
            ballxVirtual,
            ballyVirtual,
            ballvxVirtual,
            ballvyVirtual
        ) => {
            const currentVector = createVector(ballvxVirtual, ballvyVirtual);
            const scalarY =
                ballvyVirtual > 0
                    ? (height - ballyVirtual) / currentVector.y
                    : ballyVirtual / abs(currentVector.y);
            const scalarX = (width - ballxVirtual) / currentVector.x;
            const futureVector = currentVector.copy();
            futureVector.mult(scalarY);
            if (this.debugLines) {
                stroke(0, 255, 0);
                line(
                    ballxVirtual,
                    ballyVirtual,
                    ballxVirtual + futureVector.x,
                    ballyVirtual + futureVector.y
                );
                stroke(0);    
            }
            const futureX = ballxVirtual + futureVector.x;
            const futureY = ballyVirtual + futureVector.y;
            iterations++;
            const ballWillHitXRight = futureX > width;
            const ballWillHitXLeft = futureX < 0;
            if (ballWillHitXLeft) {
                const leftVector = currentVector.copy();
                leftVector.mult(ballxVirtual / abs(currentVector.x));
                calculateFutureBall(
                    ballxVirtual + leftVector.x,
                    ballyVirtual + leftVector.y,
                    -ballvxVirtual,
                    ballvyVirtual
                )
            }
            if (ballWillHitXRight) {
                if (this.debugLines) {
                    stroke(255, 0, 0);
                    line(
                        ballxVirtual,
                        ballyVirtual,
                        ballxVirtual + futureVector.x,
                        ballyVirtual + futureVector.y
                    );
                    stroke(0);    
                }

                const rightVector = currentVector.copy();
                rightVector.mult(scalarX);

                if (this.debugLines) {
                    fill(255, 0, 0);
                    ellipse(ballxVirtual + rightVector.x, ballyVirtual + rightVector.y, 20);
                    fill(255);    
                }

                if (!moved) {
                    this.y += this.y > ballyVirtual + rightVector.y ? -paddleSpeed : paddleSpeed;
                    moved = true;
                }
                return;
            }
            if (iterations < 5)
                calculateFutureBall(
                    futureX,
                    futureY,
                    ballvxVirtual,
                    -ballvyVirtual
                );
        };

        calculateFutureBall(
            ballxVirtual,
            ballyVirtual,
            ballvxVirtual,
            ballvyVirtual
        );
    }

    show() {
        rect(this.x, this.y, this.w, this.h);
        image(this.skin, this.x-10, this.y - 50);
        rect(195, 10, 10, 10);
    }
}

