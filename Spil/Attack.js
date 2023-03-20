let textbox_continue, heretics;
let textbox_ambush = [];

function attack_setup() {
  textbox_continue = new Text_with_button(["Continue"]);
  textbox_ambush.push(
    new Text_with_button([["Use follower"], ["Do it yourself"]])
  );
  heretics = new Enemy(3, 3);
}

function attack_draw() {
  if (state == "scenario") {
    let number = Math.floor(Math.random() * 5) + 1;
    print(number);
    if (number <= 3) {
      state = "ambush";
      follower_who = followers[Math.floor(Math.random() * followers.length)];
    } else if (number <= 4) {
      state = "chest";
      player.gold += Math.floor(Math.random() * 100) + 1;
    }
  }
  if (state == "chest") {
    choices[0] = state_idle;
    textbox_continue.draw(
      "Riches beyound imagination",
      "You found a chest full of gold left behind. Hopefully no one will miss the gold, cause it's yours now."
    );
  }
  if (state == "ambush") {
    choices[0] = use_follower;
    choices[1] = yourself;
    textbox_ambush[0].draw(
      "An ambush",
      "In the middle of a sceance the walls suddenly begin to shake and you're ambushed by heretics trying to abolish your great community. You must push them back and get them out, but how? Do you send a follower out, or do you do it yourself?"
    );
  }
  if (state == "use_follower") {
    choices[0] = fight;
    textbox_continue.draw(
      "A loyal friend",
      "While you would obviously do it youself, you health have not been great, so you yell for a follower to go fight the heretics off, while you gather youself. " +
        follower_who.name +
        " is quick to jump in and help"
    );
  }
  if (state == "yourself") {
    choices[0] = state_idle;
    textbox_continue.draw(
      "If you want it done right...",
      "Knowing none of your followers will be able to mangage this you go to fight off the attackers, hoping you wont suffer too much damage, yet knowing the gods can only protect you so much"
    );
  }
  if (state == "ambush_succes") {
    choices[0] = state_idle;
    textbox_continue.draw(
      "Be gone!",
      follower_who.name +
        " manages to fight the heretics off, with only a few scratches, and you congratulate them for their efforts "
    );
  }
  if (state == "follower_dead") {
    choices[0] = use_follower;
    choices[1] = yourself;
    textbox_ambush[0].draw(
      "A Nececary sacrifice",
      follower_who.name +
        " falls to the ground in defeat, and you realize that they wont stand up again. The heretics are still going after your community, so you'll need to do something. Do you step in, or send another follower after them"
    );
  }
  if (state == "fight") {
    heretics.take_damage(follower_who.stats[1]); //Follower attacks enemy
    heretics.attack(follower_who); //Enemy attacks follower
    follower_who.dead_check();
  }
}
function use_follower() {
  state = "use_follower";
}

function yourself() {
  player.health -= 3;
  state = "yourself";
}

function fight() {
  state = "fight";
}

class Enemy {
  constructor(health, damage) {
    this.health = health;
    this.damage = damage;
  }

  attack(victim) {
    victim.stats[0] -= this.damage;
  }
  take_damage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      state = "ambush_succes";
    }
  }
}

//An attack method
//A lose heatlh/die method
