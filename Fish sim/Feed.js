class Feed {
    // Constructor
    constructor(feedPosX, feedPosY) {
        this.x = feedPosX;
        this.y = feedPosY

        this.color = "#7d4015";
    }

    // draw the feed
    show() {
        push();

        fill(this.color);
        ellipse(this.x, this.y, 10, 10);

        pop();
    }

    // move the feed
    update() {
        push();
        this.y += 1;
    }
}