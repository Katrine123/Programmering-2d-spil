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

//Load billeder
function preload() {
  for (let i = 0; i < picture.length; i++) {
    images.push(loadImage(picture[i]));
  }
}

//"Sluk" cultistskærmen
function cultist_false() {
  if ((cultist = true)) {
    cultist = false;
  }
}

//Lav en ny følger
function lav_følger() {
  cultist = true;
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
  constructor() {
    super();
    //Teksten
    this.heading = "Cultist";
    this.text =
      "You found a lonely soul wandering the streets. Do you want to try to convince them to join yout cult?";
    this.button_text = [["Try to convince them"], ["Leave them be"]];
  }
  draw() {
    super.show();
    //Lav "svarmulighederne"
    for (let i = 0; i < cultist_button.length; i++) {
      cultist_button[i].create(this.button_text[i]);
    }
  }
}
