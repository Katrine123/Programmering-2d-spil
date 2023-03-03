let health = 100;
let gold = 100;
let intro = true;
let cultist = false;
let start_følger, textbox, knap, player;
let navn = [
  ["Caroline"],
  ["Bob"],
  ["Malinda"],
  ["Jane Doe"],
  ["John"],
  ["Heather"],
  ["Jack"],
  ["Quetin"],
  ["Hannah"],
  ["Salazar"],
  ["Jefff"],
  ["Judas"],
  ["Dolores"],
  ["Sybil"],
  ["Hekate"],
  ["Lillith"],
];
let followers = [];

function setup() {
  createCanvas(520, 500);
  followers.push(new Follower(followers.length));
  textbox = new Tekst();
  player = new Player();
}

function draw() {
  background(220);
  print(cultist);
  //Lav knap + følger_1
  if (intro == false) {
    player.show();
    knap = createButton("Roll dice");
    knap.position(250, 250);
    knap.mousePressed(roll_dice);
    //Lav følgere:
    for (let i = 0; i < followers.length; i++) {
      followers[i].test();
    }
  }
  //Lav textboxes
  if (intro == true) {
    textbox.show(
      "Introduction",
      "Welcome and congratualtions. You are now a cult leader. How? Who knows? Plot related reasons i guess. Anyway, you have one loyal follower to start you off, but you'll need more. That is your goal now."
    );
  }
  if (cultist == true) {
    textbox.show(
      "Cultist",
      "You found a lonely soul wandering the streets. You convince them to join your cult"
    );
  }
}

function mousePressed() {
  if (intro == true) {
    intro = false;
  }
  /*if (cultist == true) {
    cultist = false;
  }*/
}

function roll_dice() {
  let number = Math.floor(Math.random() * 3) + 1;
  print(number);
  if (number == 1) {
    lav_følger();
  } else if (number == 2) {
    scenario();
  } else if (number == 3) {
    school();
  }
}

function lav_følger() {
  cultist = true;
  if (followers.length < 5) {
    followers.push(new Follower(followers.length));
  }
}

function scenario() {
  let number = Math.floor(Math.random() * 5) + 1;
  if (number <= 4) {
    ambush();
  } else if (number == 5) {
    chest();
  }
}

function chest() {
  //Get more gold
}

function school() {
  //upgrade follower somehow??
}

class Player {
  constructor() {
    this.gold = 100;
    this.health = 100;
  }
  show() {
    fill(200);
    rect(20, 420, 100, 60);
    fill(0);
    textSize(12);
    textAlign(LEFT, CENTER);
    text("Health: " + this.health, 25, 430);
    text("Gold: " + this.gold, 25, 450);
  }
}

class Follower {
  constructor(length) {
    this.x = length * 100;
    this.attack = Math.floor(Math.random() * 6);
    this.defence = Math.floor(Math.random() * 6);
    this.sneak = Math.floor(Math.random() * 6);
    this.name = navn[Math.floor(Math.random() * navn.length)];
  }
  test() {
    fill(250);
    textAlign(CENTER, CENTER);
    textSize(12);
    rect(this.x + 20, 20, 80, 120); //whole
    rect(this.x + 20, 120, 80, 20); //lower
    rect(this.x + 20, 20, 80, 20); //upper
    fill(0);
    text(this.name, this.x + 60, 30); //Name
    text(this.attack, this.x + 37, 130); //Attack
    text(this.defence, this.x + 60, 130); // Defence
    text(this.sneak, this.x + 83, 130); //Sneak
    //Attack
    fill(200, 0, 0);
    circle(this.x + 27, 130, 5);
    //Defence
    fill(0, 0, 200);
    circle(this.x + 50, 130, 5);
    //Sneak
    fill(0, 200, 0);
    circle(this.x + 73, 130, 5);
  }
}

class Tekst {
  constructor() {}
  show(headning, tekst) {
    fill(0, 0, 0, 200);
    rect(
      width * 0.1,
      height * 0.23,
      width - width * 0.2,
      height - height * 0.48
    );
    //Overskrift
    fill(255);
    textAlign(CENTER, TOP);
    textSize(20);
    text(headning, width * 0.1, height * 0.25, 400, 50);
    //Underskrift
    textSize(15);
    text(tekst, width * 0.1, height * 0.31, 410, 250);
  }
}
