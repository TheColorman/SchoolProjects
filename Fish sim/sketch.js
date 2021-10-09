/// <reference path="../../p5js/config/p5.global-mode.d.ts" />
//@ts-check

document.addEventListener('contextmenu', event => event.preventDefault());

const screenSize = { x: 600, y: 400 }

let fishes = [];
let feed = [];
let autoFeed;
let autoFeedDelaySlider;
let delayText;

function setup() {
    createCanvas(screenSize.x, screenSize.y);

    autoFeed = createCheckbox('Autofeeder', false);
    autoFeed.changed(feedToggle);
    autoFeedDelaySlider = createSlider(100, 10000, 5000, 100);

    // Create a first fish in the center of the screen.
    fishes.push(new Fish(width / 2, height / 2, [random(0, 255), random(0, 255), 0]));

}

function draw() {
    background(93, 163, 215);

    delayText = `Autofeed Delay: ${autoFeedDelaySlider.value()} ms`;
    if (autoFeed.checked()) text(delayText, 5, 10);

    // Loop over the array and update each fish. 
    for (const fish1 of fishes) {
        fish1.update();
        fish1.show();
        
        // slowly die
        fish1.scale > 0.5 ? fish1.scale -= 0.001 : undefined;
        // actually die
        if (fish1.scale > 10 || fish1.scale < 0.5) {
            fish1.alpha = 100;
            fish1.yVel = 1;
            fish1.xVel = 0;
            fish1.dead = true;
            fish1.growupTimer > 0 ? fish1.growupTimer -= 1 : undefined;
            fish1.mateTimer > 0 ? fish1.mateTimer -= 1 : undefined;
        }

        for (const food of feed) {
            if (!fish1.dead && (abs(food.x - fish1.x) < 15*fish1.scale && abs(food.y - fish1.y) < 10*fish1.scale)) {
                feed.remove(food);
                fish1.scale += 0.1;
            }    
        }
        for (const fish2 of fishes) {
            if (fish1 === fish2) continue;
            if (!fish1.dead && !fish2.dead && (abs(fish1.x - fish2.x) < 15*fish1.scale/2 + 15*fish2.scale/2 && abs(fish1.y - fish2.y) < 10*fish1.scale + 10*fish2.scale)) {
                // fiskeparrer
                const diff1 = fish1.color[0] > fish2.color[0] ? fish1.color[0] - fish2.color[0] : fish2.color[0] - fish1.color[0]
                const diff2 = fish1.color[1] > fish2.color[1] ? fish1.color[1] - fish2.color[1] : fish2.color[1] - fish1.color[1]
                const diff3 = fish1.color[2] > fish2.color[2] ? fish1.color[2] - fish2.color[2] : fish2.color[2] - fish1.color[2]
                const totaldiff = diff1 + diff2 + diff3;

                // check om fiskene er voksne
                if ((fish1.growupTimer == 0 && fish1.mateTimer == 0 && fish2.growupTimer == 0 && fish2.mateTimer == 0) && totaldiff < 100) {
                    fishes.push(new Fish(fish1.x, fish1.y, fish1.color, true));
                    fish1.mateTimer = 10000;
                    fish2.mateTimer = 10000;
                }

                if (!(totaldiff < 100) && (fish1.scale > fish2.scale ? fish1.scale - fish2.scale : fish2.scale - fish1.scale) > 1) {
                    // cannibalism
                    if (fish1.scale > fish2.scale) {
                        fish1.scale += fish2.scale/2;
                        fishes.remove(fish2);
                    } else {
                        fish2.scale += fish1.scale/2;
                        fishes.remove(fish1);
                    }
                }
            }
        }
    }
    for (let food of feed) {
        food.update();
        food.show();
        if (food.y > screenSize.y + 20) {
            feed.remove(food);
        }
    }

}

function mousePressed(event) {
    switch (event.button) {
        case 0: // Left click
            mouseX < screenSize.x && mouseY < screenSize.y ? fishes.push(new Fish(mouseX, mouseY, [random(0, 255), random(0, 255), 0])) : undefined;
            break;
        case 2: // Right click
            mouseX < screenSize.x && mouseY < screenSize.y ? feed.push(new Feed(mouseX, mouseY)) : undefined;
    }
}

function feedToggle() {
    autoFeedFunc();
}

function autoFeedFunc() {
    if (autoFeed.checked()) {
        feed.push(new Feed(random(10, screenSize.x - 10), 0));
        setTimeout(autoFeedFunc, autoFeedDelaySlider.value());
    }
}

// shamelessly stolen from stack overflow https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

