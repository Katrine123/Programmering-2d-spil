let intro = true;
let textbox, dice_button, player;
let screen = true;
let state = "intro";

function setup() {
  createCanvas(520, 500);
  follower_setup();
  school_setup();
  attack_setup();
  textbox = new Tekst();
  player = new Player();
  dice_button = new Button(222.5, 250, 75, 25);
  textbox_continue = new Text_with_button(["Continue"]);
}

function draw() {
  background(220);
  image(baggrund, 120, 100);
  baggrund.resize(400, 400);
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
  school_draw();
  attack_draw();
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
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].clicked(choices[i]);
    }
  }
}

function roll_dice() {
  let number = Math.floor(Math.random() * 3) + 1;
  if (number == 1) {
    state = "cultist";
  } else if (number == 2) {
    state = "school";
    follower_who = followers[Math.floor(Math.random() * followers.length)];
  } else if (number == 3) {
    state = "scenario";
  }
  screen = true;
  number = 0;
}

function ambush() {
  //Attack!
}

function chest() {
  //Get more gold. Maybe random between 1 - 100
}

class Player {
  constructor() {
    this.money = new Money();
    this.gold = this.money.start_money();
    this.health = 10;
  }
  show() {
    fill(200);
    rect(20, 430, 100, 50);
    fill(0);
    textSize(12);
    textAlign(LEFT, CENTER);
    text("Health: " + this.health, 40, 445);
    text("Gold: " + this.gold, 40, 465);
    fill(0, 128, 0);
    circle(30, 445, 5);
    fill(255, 165, 0);
    circle(30, 465, 5);
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
