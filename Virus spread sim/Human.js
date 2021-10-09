class Human {
    constructor(x, y, radius, vectX, vectY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vectX = vectX;
        this.vectY = vectY;

        this.state = "healthy";
        this.infectedTime = 0;
    }

    draw() {
        switch (this.state) {
            case "infected":
                fill(255, 0, 0);
                this.infectedTime++
                break;
            case "healthy":
                fill(255);
                break;
            case "recovered":
                fill(100, 200, 255);
                break;
        }
        circle(this.x, this.y, this.radius*2);
    }

    collision(windowWidth, windowHeight) {
        if (this.x + this.radius > windowWidth || this.x - this.radius <= 0) {
            this.vectX *= -1;
            // clamp values so it doesn't get stuck at the edge of the screen
            this.x = clamp(this.x, 1+radius, windowWidth-radius-1);
        }
        if (this.y + this.radius > windowHeight || this.y - this.radius <= 0) {
            this.vectY *= -1;
            this.y = clamp(this.y, 1+radius, windowHeight-radius-1);
        }
    }

    move() {
        this.x += this.vectX;
        this.y += this.vectY;
    }
}

/**
 * Clamps a value between a max and a min.
 * @param {number} input Value to clamp
 * @param {number} min 
 * @param {number} max 
 */
function clamp(input, min, max) {
    return Math.min(Math.max(input, min), max);
}