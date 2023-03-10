let health = 100;
let gold = 100;
let intro = true;
let textbox, dice_button, player;
let screen = true;
let state = "intro";

function setup() {
  createCanvas(520, 500);
  follower_setup();
  textbox = new Tekst();
  player = new Player();
  dice_button = new Button(222.5, 250, 75, 25);
}

function draw() {
  background(220);
  //Lav knap + følger_1
  if (state != "intro") {
    player.show();
    dice_button.create("'Roll dice'");
  }
  //Lav textboxess
  if (state == "intro") {
    textbox.show(
      "Introduction",
      "Welcome and congratualtions. You are now a cult leader. How? Who knows? Plot related reasons i guess. Anyway, you have one loyal follower to start you off, but you'll need more. That is your goal now."
    );
  }
  follower_draw();
}

function mousePressed() {
  if (screen == false) {
    dice_button.clicked(roll_dice);
  }
  if (state == "intro") {
    state = "idle";
    screen = false;
  }
  if (screen == true) {
    for (let i = 0; i < cultist_button.length; i++) {
      cultist_button[i].clicked(choices[i]);
    }
  }
}

function roll_dice() {
  let number = Math.floor(Math.random() * 1) + 1;
  if (number == 1) {
    state = "cultist";
  } else if (number == 2) {
    school();
  } else if (number == 3) {
    scenario();
  }
  screen = true;
  number = 0;
}

function scenario() {
  let number = Math.floor(Math.random() * 5) + 1;
  if (number <= 4) {
    ambush();
  } else if (number == 5) {
    chest();
  }
}
function ambush() {
  //Attack!
}

function chest() {
  //Get more gold. Maybe random between 1 - 100
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

class Tekst {
  constructor() {}
  show(heading, tekst) {
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
    text(heading, width * 0.1, height * 0.25, 400, 50);
    //Underskrift
    textSize(15);
    text(tekst, width * 0.1, height * 0.31, 410, 250);
  }
}

class Button {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  create(tekst) {
    fill(200);
    rect(this.x, this.y, this.w, this.h);
    textAlign(CENTER, CENTER);
    textSize(12);
    fill(0);
    text(tekst, this.x + this.w / 2, this.y + this.h / 2);
  }
  clicked(funct) {
    if (mouseX > this.x && mouseX < this.x + this.w) {
      if (mouseY > this.y && mouseY < this.y + this.h) {
        funct();
      }
    }
  }
}
