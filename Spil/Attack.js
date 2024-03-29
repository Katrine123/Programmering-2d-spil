let heretics;
let who = [];
let textbox_ambush = [];
let textbox_who;
let textbox_dead = [];
let getmoney_head;
let getmoney_bottom;

//Setup:
function attack_setup() {
  //Laver objekter
  textbox_ambush.push(
    new Text_with_button([["Use follower"], ["Do it yourself"]])
  );
  textbox_dead = new Text_with_button(["Restart"]);
  heretics = new Enemy(3, 3);
}

//Draw:
function attack_draw() {
  if (mainState == "Robbery") {
    //Overskrifter til roobery
    getmoney_head = [
      "Pick-pocket",
      "Store robbery",
      "Bank robbery",
      "Pick-pocket fail",
      "Store robbery fail",
      "Bank robbery fail",
    ];
    //Knappens funktioen. Den er det sammen uanset hvad der sker, og derfor ligger den her.
    choices[0] = state_idle;
    //Underskrifter til robbery
    getmoney_bottom = [
      //Pick poket
      follower_who.name +
        " pick-pocketed strangers walking down the main road after seeing that there was not as much gold in the stash as they thought.\n They got " +
        change +
        " gold",
      //Store
      follower_who.name +
        " robbed a convenience store and got " +
        change +
        " gold to put in the stash ",
      //Bank
      follower_who.name +
        " choose to rob a bank to help fill up the gold stash and got " +
        change +
        " gold",
      //Pick pocket fail
      follower_who.name +
        " tried to pick-pocket a old lady but while their hand was still in her handbag the lady noticed and beat the shit out of them",
      //Store fail
      follower_who.name +
        " tried to rob a store , however the clerk had other ideas and treatened to shoot them if they did not leave",
      //Bank fail
      follower_who.name +
        " tried to rob a bank but was quickly stopped by the police and you had to go bail them out",
    ];

    if (state == "pick-pocket") {
      textbox_continue.draw(getmoney_head[0], getmoney_bottom[0]);
    }
    if (state == "store robbery") {
      textbox_continue.draw(getmoney_head[1], getmoney_bottom[1]);
    }
    if (state == "bank robbery") {
      textbox_continue.draw(getmoney_head[2], getmoney_bottom[2]);
    }
    if (state == "robbery fail pick-pocket") {
      textbox_continue.draw(getmoney_head[3], getmoney_bottom[3]);
    }
    if (state == "robbery fail store") {
      textbox_continue.draw(getmoney_head[4], getmoney_bottom[4]);
    }
    if (state == "robbery fail bank") {
      textbox_continue.draw(getmoney_head[5], getmoney_bottom[5]);
    }
  }

  if (mainState == "Ambush") {
    //Ambush screen
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

    //Use follower screen
    if (state == "use_follower") {
      //Hvis der er flere end 0 followers, så lav "who should fight" screen
      if (followers.length > 0) {
        for (let i = 0; i < followers.length; i++) {
          choices[i] = fight;
        }
        textbox_who.draw("Who?", "Great. Who should fight?");
      } else {
        //Ellers lav "No one left" screen
        choices[0] = yourself;
        textbox_continue.draw(
          "No one left",
          "You look around waiting for someone to save you, but realize no one is left. Everyone's either dead or gone, and you'll have to survive youself"
        );
      }
    }
    //Youself screen
    if (state == "yourself") {
      choices[0] = state_idle;
      textbox_continue.draw(
        "If you want it done right...",
        "Knowing none of your followers will be able to mangage this you go to fight off the attackers, hoping you wont suffer too much damage, yet knowing the gods can only protect you so much"
      );
    }
    //Succes screen
    if (state == "ambush_succes") {
      choices[0] = state_idle;
      textbox_continue.draw(
        "Be gone!",
        follower_who.name +
          " manages to fight the heretics off, with only a few scratches, and you congratulate them for their efforts "
      );
    }
    //Faliure screen
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
      if (heretics.health > 0) {
        heretics.attack(follower_who); //Enemy attacks follower
      }
    }
  }

  //Dead screen
  if (state == "dead") {
    choices[0] = restart;
    textbox_dead.draw(
      "You died",
      "As your disciples look down on you lying on the ground taking your final breaths you see you are not dying in vain and that your legacy will live on in them"
    );
  }
}

//Funktioner:

function use_follower() {
  who = [];
  state = "use_follower";
  for (let i = 0; i < followers.length; i++) {
    who.push(followers[i].name);
  }
  textbox_who = new Text_with_button(who);
}

function yourself() {
  player.health -= 3;
  if (followers.length > 0) {
    state = "yourself";
  } else if (followers.length == 0) {
    state_idle();
  }
  if (player.health <= 0) {
    state = "dead";
  }
}

// reloads the page
function restart() {
  location.reload();
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
