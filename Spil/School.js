//Funktioner og tekst for school:

let school_head = [];
let school_bottom = [];

//Steup:
function school_setup() {
  textbox_school = new Text_with_button([["Yes"], ["No"]]);
  school_head = [
    "An academic upgrade",
    "Knowlegde is power",
    "Time is money",
    "No more money",
  ];
}

//Draw:
function school_draw() {
  if (mainState == "School") {
    school_bottom = [
      //Question
      "Your follower " +
        follower_who.name +
        " is asking for more knowlegde. Do you want to pay for their studies?\n It will cost you 25 gold. You have " +
        player.gold +
        " gold",
      //Yes
      "You decide to pay for their studies and " +
        follower_who.name +
        " is now smarter and better. Hopefully it's a good investment. Their stats are now: \n\n Health: " +
        follower_who.stats[0] +
        " Attack: " +
        follower_who.stats[1] +
        " Stealth " +
        follower_who.stats[2],
      //No
      "While knowlegde might be power, it comes at a cost that you won't pay. " +
        follower_who.name +
        "seems to understand you though, after you tell them that it isn't the plan the gods made for them",
      //No money
      "The stash is running low and the school you are sending " +
        follower_who.name +
        " to will not take a lecture about the gods as payment.",
    ];
  }
}

//Funktioner:

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
