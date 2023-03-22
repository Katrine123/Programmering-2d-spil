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
  ["Pictures/Face1.png"],
  ["Pictures/Face2.png"],
  ["Pictures/Face3.png"],
  ["Pictures/Face4.png"],
  ["Pictures/Face5.png"],
  ["Pictures/Face6.png"],
  ["Pictures/Face7.png"],
];
let images = [];
let followers = [];
let buttons = [];
let choices = [[], []];
let textbox_cultist = [];
let stats, a, d, s;

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
    new Text_with_button([["Try to convince them"], ["Leave them be"]])
  );
  textbox_cultist.push(new Text_with_button(["Continue"]));
}

//Draw: Cultist true/false:
function follower_draw() {
  print(state);
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

    stats = new Stats();

    this.stats = stats.give_stats();

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
      buttons.push(new Button(70, 340 - i * 60, 120, 25));
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
