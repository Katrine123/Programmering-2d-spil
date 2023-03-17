let textbox_schoool = [];
let follower_who;

function school_setup() {
  textbox_schoool.push(new Text_with_button([["Yes [-25 gold]"], ["No"]]));
  textbox_schoool.push(new Text_with_button(["Continue"]));
}

function school_draw() {
  print(follower_who);
  if (state == "school") {
    choices[0] = school_yes;
    choices[1] = school_no;
    textbox_schoool[0].draw(
      "An academic upgrade",
      "Your follower " +
        follower_who.name +
        " is asking for more knowlegde. Do you want to pay for their studies?"
    );
  }
  if (state == "school_yes") {
    choices[0] = state_idle;
    textbox_schoool[1].draw(
      "Knowlegde is power",
      "You decide to pay for their studies and " +
        follower_who.name +
        " is now smarter and better. Hopefully it's a good investment"
    );
  }
  if (state == "school_no") {
    choices[0] = state_idle;
    textbox_schoool[1].draw(
      "Time is money",
      "While knowlegde might be power, it comes at a cost that you won't pay. " +
        follower_who.name +
        "seems to understand you though, after you tell them that it isn't the plan the gods made for them"
    );
  }
}

function school_yes() {
  player.gold -= 25;
  state = "school_yes";
  follower_who.health += 1;
  follower_who.sneak += 1;
  follower_who.attack += 1;
}

function school_no() {
  state = "school_no";
}
