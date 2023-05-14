//Funktioner, billeder, klasser og tekst for followers

//Navne til followers
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
//Små billeder til followers
let picture = [
  ["Pictures/Face1.png"],
  ["Pictures/Face2.png"],
  ["Pictures/Face3.png"],
  ["Pictures/Face4.png"],
  ["Pictures/Face5.png"],
  ["Pictures/Face6.png"],
  ["Pictures/Face7.png"],
];

//Større billeder til followers
let bigpicture = [
  ["Pictures/BigFace1.png"],
  ["Pictures/BigFace2.png"],
  ["Pictures/BigFace3.png"],
  ["Pictures/BigFace4.png"],
  ["Pictures/BigFace5.png"],
  ["Pictures/BigFace6.png"],
  ["Pictures/BigFace7.png"],
];

//baggrund til followers
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

let cultist = [
  "Cultist",
  "You found a lonely soul wandering the streets. Do you want to try to convince them to join yout cult?",
];
//Overskriften til de forskellige skærme
let follower_convince_head = [
  "Succes",
  "Succes",
  "Faliure",
  "Leave them be",
  "No more space",
];
let follower_convince_bottom;

//Variabler
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
  //Laver føste follower
  stateMachine = new StateMachine();
  followers.push(new Follower());
  //Laver objektet til knappen
  textbox_cultist = new Text_with_button([
    ["Try to convince them"],
    ["Leave them be"],
  ]);
}

//Draw:
function follower_draw() {
  if (mainState == "Follower") {
    //Teksten til de forskellige skærme
    follower_convince_bottom = [
      "You managed to convince them, now having " +
        followers.length +
        " followers at your beg and call",
      "You managed to convince them, now having " +
        followers.length +
        " follower at your beg and call",
      "'Uh, no thanks.' They look at you wierdly and slowly walk away. You convince yourself that they weren't cut out for it anyway",
      "You look at them and consider it, but decide against it. Why bother with someone who's obviously not cut out for it anyway",
      "There's no more space in your 'community' so you leave them be, even though they look like they would fit in perfectly ",
    ];
  }
  //Lav følgere:
  if (state != "intro") {
    for (let i = 0; i < followers.length; i++) {
      followers[i].draw(i);
    }
  }
  //Idle skærm
  if (state == "idle") {
    for (let i = 0; i < followers.length; i++) {
      followers[i].follower_screen(i);
    }
  }
  // tutorial for game
  if (state == "tutorial") {
    choices[0] = state_idle;
    textbox_continue.draw(
      "Tutorial",
      'To help your cult progress you need to learn some basics. When you click "Continue" you will be met with the home screen. Here you hit the "Roll dice" button to help and defend your cult from attackers, get new members, train your members or rob places to get more gold.'
    );
  }
}

//Funktioner:

//Try to convince follower:
//Success:
function try_convince() {
  let number = Math.floor(Math.random() * followers.length + 1);
  if (number <= 2) {
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
  if (followers.length == 5) {
    state = "full";
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

  draw(x) {
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
    //Hvis musen er inden for followers firkant laves skærmen
    if (mouseX > x * 100 + 20 && mouseX < x * 100 + 20 + 80) {
      if (mouseY > 20 && mouseY < 140) {
        //Firkanten:
        fill(255);
        rect(50, 125, 400, 250);
        //Teksten:
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
        //Billedet
        image(this.bigPicture, 237.5, 137.5);
        this.bigPicture.resize(200, 200);
      }
    }
  }
  //Metode der tjekker om follower er død
  dead_check() {
    if (this.stats[0] <= 0) {
      state = "follower_dead";
      followers.splice(followers.indexOf(follower_who), 1);
      navn.push(this.name);
      //SÆT BILLEDER OG STORY TILBAGE I ARRAYS
    }
  }
}
