/// <reference path="../../../p5js/config/p5.global-mode.d.ts" />

let people = [];
const n = 400;
const radius = 10;
const infectionChance = 0.5;    // chance to infect
const infectionTime = 100;      // time to stay infected
const maxVelocity = 4;          // max velocity for people
const humanCollison = true;     // whether humans collide with eachother

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < n; i++) {
        people.push(new Human(
            random(radius, windowWidth-radius), 
            random(radius, windowHeight-radius), 
            radius, 
            random(-maxVelocity, maxVelocity), 
            random(-maxVelocity, maxVelocity)
        ));
    }
    people[0].state = "infected";
}

function draw() {
    background(200);
    for (let person of people) {
        person.collision(windowWidth, windowHeight);
        person.move();
        if (person.infectedTime > infectionTime) person.state = "recovered";  // recovery
        person.draw();
        for (let person2 of people) {
            if (person === person2) continue;   // dont run collision detection on yourself
            // collision
            if (dist(person.x, person.y, person2.x, person2.y) <= radius*2) {
                if (humanCollison) {
                    let oldX = person.vectX;    // switch around their velocities because I don't want to make an advanced collision system
                    let oldY = person.vectY;
                    person.vectX = person2.vectX;
                    person.vectY = person2.vectY;
                    person2.vectX = oldX;
                    person2.vectY = oldY;
                }

                // infection chance
                if (Math.random() > infectionChance) continue;                
                // simply incredible detection system for if one is infected and the other is healthy
                if (["infectedhealthy", "healthyinfected"].includes(`${person.state}${person2.state}`)) {
                    person.state = "infected";
                    person2.state = "infected";
                }
            }
        }
    }
}