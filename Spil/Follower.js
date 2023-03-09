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
let picture = [
  ["Pictures/Face.png"],
  ["Pictures/Face2.png"],
  ["Pictures/Face3.png"],
  ["Pictures/Face4.png"],
];
let images = [];
let followers = [];
let cultist_button = [];
let choices = [[], []];
let textbox_cultist = [];

//Load billeder
function preload() {
  for (let i = 0; i < picture.length; i++) {
    images.push(loadImage(picture[i]));
  }
}

//Setup:
function follower_setup() {
  followers.push(new Follower(followers.length));
  textbox_cultist.push(
    new Cultist_Tekst([["Try to convince them"], ["Leave them be"]])
  );
  textbox_cultist.push(new Cultist_Tekst(["Continue"]));
}

//Draw: Cultist true/false:
function follower_draw() {
  print(screen, state);
  //Lav følgere:
  if (state != "intro") {
    for (let i = 0; i < followers.length; i++) {
      followers[i].test();
    }
  }

  //Cultist screen.
  if (state == "cultist") {
    choices[0] = try_convince;
    choices[1] = dont_convince;
    textbox_cultist[0].draw(
      "Cultist",
      "You found a lonely soul wandering the streets. Do you want to try to convince them to join yout cult?"
    );
  }
  //Success screen
  if (state == "convince") {
    choices[0] = state_idle;
    textbox_cultist[1].draw(
      "Succes",
      "You managed to convince them, now having " +
        followers.length +
        " followers at your beg and call"
    );
  }
  //Faliure screen
  if (state == "cant_convince") {
    choices[0] = state_idle;
    textbox_cultist[1].draw(
      "Faliure",
      "'Uh, no thanks.' They look at you wierdly and slowly walk away. You convince yourself that they weren't cut out for it anyway"
    );
  }
  //Leave them be screen:
  if (state == "dont_convince") {
    choices[0] = state_idle;
    textbox_cultist[1].draw(
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

function convince_false() {
  if (convince == true) {
    convince = false;
  }
}

function cant_convince_false() {
  if (cant_convince == true) {
    cant_convince = false;
  }
}

function non_convince_false() {
  if (non_convince == true) {
    non_convince = false;
  }
}
/////

function try_convince() {
  let number = Math.floor(Math.random() * followers.length + 1);
  print(number);
  if (number == 1) {
    lav_følger();
    convince = true;
  } else {
    cant_convince = true;
  }
  cultist_false();
}

function dont_convince() {
  non_convince = true;
  cultist_false();
}

//Lav en ny følger
function lav_følger() {
  if (followers.length < 5) {
    followers.push(new Follower(followers.length));
  }
}

//Klasse for følger
class Follower {
  constructor(length) {
    this.x = length * 100;
    //Stats
    this.attack = Math.floor(Math.random() * 6);
    this.defence = Math.floor(Math.random() * 6);
    this.sneak = Math.floor(Math.random() * 6);
    //Navn + billede
    this.name = navn[Math.floor(Math.random() * navn.length)];
    this.picture = images[Math.floor(Math.random() * images.length)];
    //Arrays
    navn.splice(navn.indexOf(this.name), 1);
    images.splice(images.indexOf(this.picture), 1);
  }
  test() {
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
    text(this.attack, this.x + 37, 130); //Attack
    text(this.defence, this.x + 60, 130); // Defence
    text(this.sneak, this.x + 83, 130); //Sneak
    //Cirkler
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

//Cultist textboxen
class Cultist_Tekst extends Tekst {
  constructor(button) {
    super();
    //Teksten
    this.button_text = button;
    for (let i = 0; i < 2; i++) {
      cultist_button.push(new Button(70, 340 - i * 60, 120, 25));
    }
  }
  draw(heading, tekst) {
    super.show(heading, tekst);
    //Lav "svarmulighederne"
    for (let i = 0; i < this.button_text.length; i++) {
      cultist_button[i].create(this.button_text[i]);
    }
  }
}
