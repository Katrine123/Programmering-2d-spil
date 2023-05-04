let textbox_continue = [];

function school_setup() {
  textbox_school = new Text_with_button([["Yes"], ["No"]]);
}

function school_draw() {
  if (state == "school") {
    choices[0] = school_yes;
    choices[1] = school_no;
    textbox_school.draw(
      "An academic upgrade",
      "Your follower " +
        follower_who.name +
        " is asking for more knowlegde. Do you want to pay for their studies?\n It will cost you 25 gold. You have " +
        player.gold +
        " gold"
    );
  }
  if (state == "school_yes") {
    choices[0] = state_idle;
    textbox_continue.draw(
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
    textbox_continue.draw(
      "Time is money",
      "While knowlegde might be power, it comes at a cost that you won't pay. " +
        follower_who.name +
        "seems to understand you though, after you tell them that it isn't the plan the gods made for them"
    );
  }
  if (state == "no_money") {
    choices[0] = state_idle;
    textbox_continue.draw(
      "No more money",
      "The stash is running low and the school you are sending " +
        follower_who.name +
        " to will not take a lecture about the gods as payment."
    );
  }
}

//upgrades stat for follower
function school_yes() {
  if (player.gold - 25 > 0 || player.gold - 25 == 0) {
    follower_who.stat.change_stats(follower_who);
    player.money.lose_money();
    state = "school_yes";
  } else {
    state = "no_money";
  }
}

function school_no() {
  state = "school_no";
}
