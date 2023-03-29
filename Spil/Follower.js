let navn = [
  ["Caroline"],
  ["Bob"],
  ["Malinda"],
  ["Jane"],
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
let picture = [
  ["Pictures/Face1.png"],
  ["Pictures/Face2.png"],
  ["Pictures/Face3.png"],
  ["Pictures/Face4.png"],
  ["Pictures/Face5.png"],
  ["Pictures/Face6.png"],
  ["Pictures/Face7.png"],
];

//Lav bedre kvalitets billeder
let bigpicture = [
  ["Pictures/BigFace1.png"],
  ["Pictures/BigFace2.png"],
  ["Pictures/BigFace3.png"],
  ["Pictures/BigFace4.png"],
  ["Pictures/BigFace5.png"],
  ["Pictures/BigFace6.png"],
  ["Pictures/BigFace7.png"],
];

let story = [
  [
    " After getting shunned by thier family they ended up on the street with no meaning in thier life",
  ],
  [
    " They lost the love of their life through a horrific accident that has left them with a sense of not knowing what to do",
  ],
  [
    "The voices said they should join, and you allways follow the voices. Of course you do. You can´t do antýthing else",
  ],
  [
    "Having lived on the streets for some time the cult came as if it was sent from the gods and help them",
  ],
  [
    "With nothing new ever happening in their life they see this as an opportunity to get some spice in their life",
  ],
  [
    "It was always thier dream to be part of a cult and to help the cult be something greater then they ever could be",
  ],
  [
    "Since they were always an outcast, the thought of finally being able to be part of something was all they needed to hear",
  ],
  [
    "After their pet died, they were at an all time low, but now have hopes to see it again through the work of the cult",
  ],
];
let images = [];
let bigImages = [];
let followers = [];
let buttons = [];
let choices = [[], []];
let textbox_cultist = [];

//Load billeder
function preload() {
  for (let i = 0; i < picture.length; i++) {
    images.push(loadImage(picture[i]));
  }
  for (let i = 0; i < bigpicture.length; i++) {
    bigImages.push(loadImage(bigpicture[i]));
  }
  baggrund = loadImage("Pictures/Baggrund.png");
}

//Setup:
function follower_setup() {
  followers.push(new Follower());
  textbox_cultist = new Text_with_button([
    ["Try to convince them"],
    ["Leave them be"],
  ]);
  //textbox_cultist.push(new Text_with_button(["Continue"]));
}

//Draw: Cultist true/false:
function follower_draw() {
  print(state);
  //Lav følgere:
  if (state != "intro") {
    for (let i = 0; i < followers.length; i++) {
      followers[i].test(i);
    }
  }
  if (state == "idle") {
    for (let i = 0; i < followers.length; i++) {
      followers[i].follower_screen(i);
    }
  }
  //Cultist screen.
  if (state == "cultist") {
    choices[0] = try_convince;
    choices[1] = dont_convince;
    textbox_cultist.draw(
      "Cultist",
      "You found a lonely soul wandering the streets. Do you want to try to convince them to join yout cult?"
    );
  }
  //Success screen
  if (state == "convince") {
    choices[0] = state_idle;
    textbox_continue.draw(
      "Succes",
      "You managed to convince them, now having " +
        followers.length +
        " followers at your beg and call"
    );
  }
  //Faliure screen
  if (state == "cant_convince") {
    choices[0] = state_idle;
    textbox_continue.draw(
      "Faliure",
      "'Uh, no thanks.' They look at you wierdly and slowly walk away. You convince yourself that they weren't cut out for it anyway"
    );
  }
  //Leave them be screen:
  if (state == "dont_convince") {
    choices[0] = state_idle;
    textbox_continue.draw(
      "Leave them be",
      "You look at them and consider it, but decide against it. Why bother with someone who's obviously not cut out for it anyway"
    );
  }
}

//"Sluk" alting (Saml til en funktion maybe?):
function state_idle() {
  state = "idle";
  screen = false;
}

/////

//Try to convince follower:
//Success:
function try_convince() {
  let number = Math.floor(Math.random() * followers.length + 1);
  if (number == 1) {
    lav_følger();
    state = "convince";
  } else {
    state = "cant_convince";
  }
}

//Faliure:
function dont_convince() {
  state = "dont_convince";
}

//Lav en ny følger
function lav_følger() {
  if (followers.length < 5) {
    followers.push(new Follower());
  }
}

//Klasse for følger
class Follower {
  constructor() {
    this.x;
    //Stats

    this.stat = new Stats();
    this.stats = this.stat.give_stats();

    //Navn + billede
    this.number = Math.floor(Math.random() * images.length);
    this.name = navn[Math.floor(Math.random() * navn.length)];
    this.picture = images[this.number];
    this.bigPicture = bigImages[this.number];
    this.story = story[Math.floor(Math.random() * story.length)];
    //Arrays
    navn.splice(navn.indexOf(this.name), 1);
    images.splice(this.number, 1);
    bigImages.splice(this.number, 1);
    story.splice(story.indexOf(this.story), 1);
  }

  test(x) {
    this.x = x * 100;
    fill(250);
    rect(this.x + 20, 20, 80, 120); //Hele firkanten
    rect(this.x + 20, 120, 80, 20); //Øverste firkant
    rect(this.x + 20, 20, 80, 20); //Nederste firkant
    //Billede
    image(this.picture, this.x + 21, 41);
    this.picture.resize(78, 78);
    //Tekst
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(12);
    text(this.name, this.x + 60, 30); //Name
    text(this.stats[0], this.x + 37, 130); //Health
    text(this.stats[1], this.x + 60, 130); // Attack
    text(this.stats[2], this.x + 83, 130); //Sneak
    //Cirkler
    //Health
    fill(0, 128, 0);
    circle(this.x + 27, 130, 5);
    //Attack
    fill(139, 0, 0);
    circle(this.x + 50, 130, 5);
    //Sneak
    fill(70, 130, 180);
    circle(this.x + 73, 130, 5);
  }

  follower_screen(x) {
    if (mouseX > x * 100 + 20 && mouseX < x * 100 + 20 + 80) {
      if (mouseY > 20 && mouseY < 140) {
        fill(255);
        rect(50, 125, 400, 250);
        fill(0);
        textAlign(CENTER, TOP);
        textSize(20);
        text(this.name, 150, 135);
        textSize(15);
        textAlign(LEFT, TOP);
        text("Health: " + this.stats[0], 60, 180);
        text("Attack: " + this.stats[1], 60, 200);
        text("Stealth: " + this.stats[2], 60, 220);
        text(this.story, 60, 250, 180, 115);
        image(this.bigPicture, 237.5, 137.5);
        this.bigPicture.resize(200, 200);
      }
    }
  }

  dead_check() {
    if (this.stats[0] <= 0) {
      state = "follower_dead";
      followers.splice(followers.indexOf(follower_who), 1);
    }
  }
}

//Textbox with buttons
class Text_with_button extends Tekst {
  constructor(button) {
    super();
    //The button text
    this.button_text = button;
    //Makes two buttons
    for (let i = 0; i < this.button_text.length; i++) {
      buttons.push(new Button(70, 340 - i * 40, 120, 25));
    }
  }
  draw(heading, tekst) {
    super.show(heading, tekst);
    //Shows the buttons
    for (let i = 0; i < this.button_text.length; i++) {
      buttons[i].create(this.button_text[i]);
    }
  }
}
