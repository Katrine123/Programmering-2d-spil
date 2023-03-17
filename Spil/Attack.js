let textbox_chest, textbox_ambush;

function attack_setup() {
  textbox_chest = new Text_with_button(["Continue"]);
  textbox_ambush.push(
    new Text_with_button(["Use follower"], ["Do it yourself"])
  );
}

function attack_draw() {
  if (state == "scenario") {
    let number = Math.floor(Math.random() * 5) + 1;
    print(number);
    if (number <= 4) {
      ambush();
    } else if (number <= 5) {
      state = "chest";
    }
  }
  if (state == "chest") {
    choices[0] = state_idle;
    textbox_chest.draw(
      "Riches beyound imagination",
      "You found a chest full of gold left behind. Hopefully no one will miss the gold, cause it's yours now."
    );
  }
  if (state == "ambush") {
    choices[0] = use_follower;
    choices[1] = yourself;
    textbox_ambush.draw(
      "An ambush",
      "In the middle of a sceance the walls suddenly begin to shake and you're ambushed by heretics trying to abolish your great community. You must push them back and get them out, but how? Do you send a follower out, or do it yourself"
    );
  }
}
