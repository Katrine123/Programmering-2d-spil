let heretics;
let who = [];
let textbox_ambush = [];
let textbox_who;

function attack_setup() {
  textbox_ambush.push(
    new Text_with_button([["Use follower"], ["Do it yourself"]])
  );
  heretics = new Enemy(3, 3);
}

function attack_draw() {
  print("follower_who = ", follower_who, "followers = ", followers);
  if (state == "scenario") {
    let number = Math.floor(Math.random() * 5) + 1;
    if (number <= 3) {
      state = "ambush";
    } else if (number <= 4) {
      player.money.robbery(follower_who.stats[2], player.gold);
    }
  }

  if (state == "pick-pocket") {
    choices[0] = state_idle;
    textbox_continue.draw(
      "Pick-pocket",
      follower_who.name +
        " pick-pocketed strangers walking down the main road after seeing that there was not as much gold in the stash as they thought, they got " +
        change +
        " gold"
    );
  }
  if (state == "store robbery") {
    choices[0] = state_idle;
    textbox_continue.draw(
      "Store robbery",
      follower_who.name +
        " robbed a convenience store and got" +
        change +
        " gold to put in the stash "
    );
  }
  if (state == "bank robbery") {
    choices[0] = state_idle;
    textbox_continue.draw(
      "Bank robbery",
      follower_who.name +
        " choose to rob a bank to help fill up the gold stash and got" +
        change +
        " gold"
    );
  }
  if (state == "robbery fail pick-pocket") {
    choices[0] = state_idle;
    textbox_continue.draw(
      "Fail",
      follower_who.name +
        " tried to pick-pocket a old lady but while their hand was still in her handbag the lady noticed and beat the shit out of them"
    );
  }
  if (state == "robbery fail store") {
    choices[0] = state_idle;
    textbox_continue.draw(
      "Fail",
      follower_who.name +
        " tried to rob a store , howerver the clerk had other ideas and treaten to shoot them if they did not leave"
    );
  }
  if (state == "robbery fail bank") {
    choices[0] = state_idle;
    textbox_continue.draw(
      "Fail",
      follower_who.name +
        " tried to rob a bank but was quickly stop by the police and you had to go bail them out"
    );
  }
  if (state == "ambush") {
    heretics.set_health();
    choices[0] = use_follower;
    choices[1] = yourself;
    textbox_ambush[0].draw(
      "An ambush",
      "In the middle of a sceance the walls suddenly begin to shake and you're ambushed by heretics trying to abolish your great community. You must push them back and get them out, but how? Do you send a follower out, or do you do it yourself? \n Enemy stats: \n Health: " +
        heretics.health +
        " Attack:  " +
        heretics.damage
    );
  }

  if (state == "use_follower") {
    //FIKS
    for (let i = 0; i < followers.length; i++) {
      //follower_who = followers[i];
      choices[i] = fight;
    }

    textbox_who.draw("Who?", "Great. Who should fight?");
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
    print(heretics.health);
    heretics.take_damage(follower_who.stats[1]); //Follower attacks enemy
    if (heretics.health > 0) {
      heretics.attack(follower_who); //Enemy attacks follower
    }
  }
}
function use_follower() {
  who = [];
  state = "use_follower";
  for (let i = 0; i < followers.length; i++) {
    who.push(followers[i].name);
  }
  textbox_who = new Text_with_button(who);
  //follower_who = followers[Math.floor(Math.random() * followers.length)];
  print(who, textbox_who.button_text);
}

function yourself() {
  player.health -= 3;
  state = "yourself";
}

function fight() {
  state = "fight";
}

class Enemy {
  constructor(damage) {
    this.damage = damage;
    this.health = 3;
  }
  set_health() {
    this.health = 3;
  }
  attack(victim) {
    victim.stats[0] -= this.damage;
    victim.dead_check();
  }
  take_damage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      state = "ambush_succes";
    }
  }
}
