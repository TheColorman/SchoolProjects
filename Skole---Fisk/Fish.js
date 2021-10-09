/// <reference path="../../p5js/config/p5.global-mode.d.ts" />
// The Fish class defines fish objects, that move around on the
// screen and change direction when they bump into the walls.
class Fish {
    // Constructor function for a new fish.
    // Requires x, y position where the fish is to be created.
    constructor(x, y, color, baby) {
        // Record the x and y position inside 'this'
        this.x = x;
        this.y = y;

        // Pick a random starting velocity
        this.xVel = random(-1, 1);
        this.yVel = random(-1, 1);

        // Colors because they are cool
        
        this.color = color;
        //this.color ||= [random(0, 255), random(0, 255), random(0, 255)];
        this.alpha = 255;
        this.scale = 1;

        this.dead = false;
        this.growupTimer = baby ? 50000 : 0;
        this.mateTimer = 0;
    }

    // Function to display the fish on the canvas.
    show() {
        // push matrix to save previous state
        push();

        // Translate to the x, y position of the fish.
        translate(this.x, this.y);
        scale(this.scale);

        // Draw a triangle to represent the fish
        noStroke();
        fill(this.color[0], this.color[1], this.color[2], this.alpha);
        let value = this.xVel > 0 ? 1 : -1;
        triangle(20 * value, 0, -10 * value, -10, -10 * value, 10);

        pop();
    }

    // Update the position of the fish depending on its velocity.
    update() {
        this.x += this.xVel;
        this.y += this.yVel;

        // Check whether the fish has gone off the left or right
        if (!this.dead && (this.x < 0 || this.x > width)) {
            // If it has, reverse direction and move back
            this.xVel = -this.xVel;
            this.x += this.xVel;
        }

        // Check whether the fish has gone off the top or bottom
        if (!this.dead && (this.y < 0 || this.y > height)) {
            // If it has, reverse direction and move back
            this.yVel = -this.yVel;
            this.y += this.yVel;
        }

        if (this.dead && this.y > height-20) {
            this.yVel = 0;
        }
    }
}