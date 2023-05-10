let textbox, dice_button, player;
//Screen beskriver om der er en texbox som bliver vist
let screen = true;
//State beskriver hvad der sker
let state = "intro";
//Follower_who er den karakter der bliver brugt i scenariet
let follower_who;

function setup() {
  createCanvas(520, 500);
  //Der laves setup's for de andre sider
  follower_setup();
  school_setup();
  attack_setup();
  story_setup();
  //Laver objekter - Klasserne kan ses længere nede
  textbox = new Tekst();
  player = new Player();
  dice_button = new Button(222.5, 250, 75, 25);
  textbox_continue = new Text_with_button(["Continue"]);
}

function draw() {
  print(state, time);
  background(220);
  //Baggrundsbilledet - Kan ses preloadet i "Follower"
  image(baggrund, 120, 100);
  baggrund.resize(400, 400);
  //Laver "roll dice" knappen og player hvis state ikke er intro
  if (state != "intro") {
    player.show();
    dice_button.create("'Roll dice'");
  }
  //Laver intro textboxen
  if (state == "intro") {
    textbox.show(
      "Introduction",
      "Welcome and congratualtions. You are now a cult leader. How? Who knows? Plot related reasons i guess. Anyway, you have one loyal follower to start you off, but you'll need more. That is your goal now."
    );
  }
  //Der laves draws for de andre sider
  follower_draw();
  school_draw();
  attack_draw();
  story_draw();
}

function mousePressed() {
  //Hvis der ikke er nogen texbox fremme, kan roll dice knappen trykkes på
  if (screen == false) {
    dice_button.clicked(roll_dice);
  }
  //Hvis state er intro og man trykker på skærmen skifter state til turtorial
  if (state == "intro") {
    state = "tutorial";
  }
  if (screen == true) {
    for (let i = 0; i < buttons.length; i++) {
      if (state != "use_follower") {
        //Knapperne på textboxen bliver tildelt funktioner via. choice
        buttons[i].clicked(choices[i]);
      } else if (state == "use_follower") {
        //Hvis state er use_follower bliver follower_who til den som der bliver trykket på
        buttons[i].clicked(choices[i]);
        follower_who = followers[i];
      }
    }
  }
}
//Funktionen roll dice som bestemmer hvad der skal ske
function roll_dice() {
  //Skaber et heltal mellem 1 og 4
  let number = Math.floor(Math.random() * 5) + 1;
  //Follower_who bliver random en af de karakterer der er
  follower_who = followers[Math.floor(Math.random() * followers.length)];
  //Baseret på hvad number er så ændre staten sig
  if (number == 1) {
    state = "cultist";
  } else if (number == 2) {
    if (followers.length > 0) {
      state = "school";
      follower_who = followers[Math.floor(Math.random() * followers.length)];
    } else {
      //Hvis der ikke er nogle followers kan man ikke få skolen
      roll_dice();
    }
  } else if (number == 3) {
    state = "ambush";
  } else if (number == 4) {
    if (followers.length > 0) {
      follower_who = followers[Math.floor(Math.random() * followers.length)];
      player.money.robbery(follower_who.stats[2], player.gold);
    } else {
      //Hvis der ikke er nogle followers kan man ikke få skolen
      roll_dice();
    }
  } else if (number == 5) {
    state = "story";
    follower_who = followers[Math.floor(Math.random() * followers.length)];
  }
  //Skærm bliver sat til true
  screen = true;
  number = 0;
}

//Klassen Player
class Player {
  constructor() {
    //Definerere money og health
    this.money = new Money();
    this.gold = this.money.start_money();
    this.health = 10;
  }
  show() {
    //Firkanten i hjørnet med stats
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

//Introtextens skærm
class Tekst {
  constructor() {}
  //Metoden til at vise skærmen. Bliver givet titlen og teksten
  show(heading, tekst) {
    //Kasse
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

//Klassen til knapper
class Button {
  //Lokationen og størelsen for knappen
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  //Metoden til at tegne knappen
  create(tekst) {
    fill(200);
    rect(this.x, this.y, this.w, this.h);
    textAlign(CENTER, CENTER);
    textSize(12);
    fill(0);
    text(tekst, this.x + this.w / 2, this.y + this.h / 2);
  }
  //Hvis knappen blvier trykket på gør den funktionen funct som ligger i choices[x]
  clicked(funct) {
    if (mouseX > this.x && mouseX < this.x + this.w) {
      if (mouseY > this.y && mouseY < this.y + this.h) {
        funct();
      }
    }
  }
}
