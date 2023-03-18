let textbox_chest;
let textbox_ambush = [];

function attack_setup() {
  textbox_continue = new Text_with_button(["Continue"]);
  textbox_ambush.push(
    new Text_with_button([["Use follower"], ["Do it yourself"]])
  );
}

function attack_draw() {
  if (state == "scenario") {
    let number = Math.floor(Math.random() * 5) + 1;
    print(number);
    if (number <= 3) {
      state = "ambush";
    } else if (number == 4) {
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
    choices[0] = state_idle;
    textbox_continue.draw(
      "A loyal friend",
      "While you would obviously do it youself, you health have not been great, so you yell for a follower to go fight the heretics off, while you gather youself"
    );
  }
  if (state == "yourself") {
    choices[0] = state_idle;
    textbox_continue.draw(
      "If you want it done right...",
      "Knowing none of your followers will be able to mangage this you go to fight off the attackers, hoping you wont suffer too much damage, yet knowing the gods can only protect you so much"
    );
  }
}
function use_follower() {
  state = "use_follower";
}

function yourself() {
  player.health -= 3;
  state = "yourself";
}
