let health = 100;
let gold = 100;
let intro = true;

let textbox, dice_button, player;

function setup() {
  createCanvas(520, 500);
  followers.push(new Follower(followers.length));
  textbox = new Tekst();
  textbox_cultist.push(
    new Cultist_Tekst([["Try to convince them"], ["Leave them be"]])
  );
  textbox_cultist.push(new Cultist_Tekst(["Continue"]));
  player = new Player();
  dice_button = new Button(222.5, 250, 75, 25);
}

function draw() {
  background(220);
  print(convince, choices[0]);
  //Lav knap + følger_1
  if (intro == false) {
    player.show();
    dice_button.create("Roll dice");
    //Lav følgere:
    for (let i = 0; i < followers.length; i++) {
      followers[i].test();
    }
  }
  //Lav textboxess
  if (intro == true) {
    textbox.show(
      "Introduction",
      "Welcome and congratualtions. You are now a cult leader. How? Who knows? Plot related reasons i guess. Anyway, you have one loyal follower to start you off, but you'll need more. That is your goal now."
    );
  }
  if (cultist == true) {
    choices[0] = try_convince;
    choices[1] = dont_convince;
    textbox_cultist[0].draw(
      "Cultist",
      "You found a lonely soul wandering the streets. Do you want to try to convince them to join yout cult?"
    );
  }
  if (convince == true) {
    choices[0] = convince_false;
    textbox_cultist[1].draw(
      "Succes",
      "You managed to convince them, now having " +
        followers.length +
        " followers at your beg and call"
    );
  }
  if (cant_convince == true) {
    choices[0] = cant_convince_false;
    textbox_cultist[1].draw(
      "Faliure",
      "- Uh, no thanks - They look at you wierdly and slowly walk away. You convince yourself that they weren't cut out for it anyway"
    );
  }
  if (non_convince == true) {
    choices[0] = non_convince_false;
    textbox_cultist[1].draw(
      "Let them be",
      "You look at them and consider it, but decide against it. Why bother with someone who's obviously not cut out for it anyway"
    );
  }
}

function mousePressed() {
  if (intro == false) {
    if (cultist == false) {
      dice_button.clicked(roll_dice);
    }
  }
  if (intro == true) {
    intro = false;
  }
  if (
    cultist == true ||
    convince == true ||
    cant_convince == true ||
    non_convince == true
  ) {
    for (let i = 0; i < cultist_button.length; i++) {
      cultist_button[i].clicked(choices[i]);
    }
  }
}

function roll_dice() {
  let number = Math.floor(Math.random() * 1) + 1;
  if (number == 1) {
    cultist = true;
  } else if (number == 2) {
    scenario();
  } else if (number == 3) {
    school();
  }
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
