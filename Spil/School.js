let textbox_schoool = [];
let follower_who;
let upgrade;

function school_setup() {
  textbox_schoool.push(new Text_with_button([["Yes"], ["No"]]));
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
        " is asking for more knowlegde. Do you want to pay for their studies?\n It will cost you 25 gold"
    );
  }
  if (state == "school_yes") {
    choices[0] = state_idle;
    textbox_schoool[1].draw(
      "Knowlegde is power",
      "You decide to pay for their studies and " +
        follower_who.name +
        " is now smarter and better. Hopefully it's a good investment. Their stats are now: \n\n Health: " +
        follower_who.stats[0] +
        " Attack: " +
        follower_who.stats[1] +
        " Stealth " +
        follower_who.stats[2]
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
  upgrade = new Stats();
  upgrade.change_stats();
}

function school_no() {
  state = "school_no";
}
