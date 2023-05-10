let story_head = [
  "Demands",
  "More. MORE!",
  "The first one",
  "Not enough",
  "The final bow",
];
let story_bottom = [
  "The gods demand gold and fortune. To advance in life and make the gods favour you, you'll have to sacrifice 10 coins. Do you want to?",
  "The gods decided the last amount of gold was not enough. They want more. This time they demand 25 gold",
  "Gold is not enough anymore. Now the gods want blood. Do you want to sacrifice a follower",
  "One was enough before. Not anymore. The gods demand more death. More. Do you want to give it to them?",
  "Something dramatic i guess. The gods bla bla bla yada yada yada",
];
let story_yes = [
  "You give them the gold. After all it's not too much",
  "It's a bit more this time, but manageable, though hopefully they won't ask again",
  "ljadnfowefoijer",
  "sjejfoewjooiewjropip",
  "sfwernvn vdndjkfnvjof",
];
let story_no = [
  "You refuse. The gods aren't pleased",
  "This time you refuse. They can't keep asking like this. The next day you feel terrible though",
  "09876321123456789",
  "12345678900987654321",
  "dbjhvoeg weto epw ",
];
let story_cant = "You want to, but you cant. How unfortunate.";
let f = 0;
let time = 4;

function story_setup() {
  textbox_story1 = new Text_with_button([["Yes"], ["No"]]);
  textbox_end = new Text_with_button("EID");
}
function story_draw() {
  if (state == "story") {
    if (time == 4) {
      choices[0] = end;
      choices[1] = end;
      choices[2] = end;
      textbox_end.draw(story_head[time], story_bottom[time]);
    } else {
      choices[0] = yes;
      choices[1] = no;
      textbox_story1.draw(story_head[time], story_bottom[time]);
    }
  }
  if (state == "story_yes") {
    choices[0] = state_idle;
    textbox_continue.draw(story_head[time], story_yes[time]);
  }
  if (state == "story_no") {
    choices[0] = state_idle;
    textbox_continue.draw(story_head[time], story_no[time]);
  }
  if (state == "story_cant") {
    choices[0] = state_idle;
    textbox_continue.draw(story_head[time], story_cant);
  }
  if (state == "story_end") {
    choices[0] = restart;
    textbox_dead.draw(story_head[time], story_yes[time]);
    fill(100, 0, 0, f);
    rect(0, 0, width, height);
    if (f <= 150) {
      f += 0.5;
    }
  }
}

function yes() {
  if (time == 0) {
    if (player.gold >= 10) {
      player.gold -= 10;
      state = "story_yes";
    } else {
      state = "story_cant";
    }
  }
  if (time == 1) {
    if (player.gold >= 25) {
      player.gold -= 25;
      state = "story_yes";
    } else {
      state = "story_cant";
    }
  }
  if (time == 2) {
    if (followers.length >= 1) {
      followers.splice(followers.indexOf(follower_who), 1);
      state = "story_yes";
    } else {
      state = "story_cant";
    }
  }
  if (time == 3) {
    if (followers.length >= 3) {
      for (let i = 0; i < 3; i++) {
        followers.splice(followers.indexOf(follower_who), 1);
        follower_who = followers[Math.floor(Math.random() * followers.length)];
      }
      state = "story_yes";
    } else {
      state = "story_cant";
    }
  }
}
function end() {
  state = "story_end";
}

function no() {
  state = "story_no";
  player.health--;
}
