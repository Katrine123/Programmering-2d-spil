let story_head = [
  "Something 1",
  "Write something here",
  "Headline",
  "Hello :)",
  "I love you <3",
];
let story_bottom = [
  [
    "This is a test for the story line. Idk what to write here, just something that works",
  ],
  ["Please if you see this write something if you have an idea for something"],
  ["This is the bottomtext under the headline where shit is supposed to stand"],
  [
    "Hello :) I'm sitting and listening to people play music, while i'm waiting for my turn.",
  ],
  ["If you see this, please remember that i love you very much :)"],
];
let time = 0;

function story_setup() {
  textbox_story1 = new Text_with_button([["Choice 1"], ["Choice 2"]]);
}
function story_draw() {
  if (state == "story") {
    choices[0] = state_idle;
    choices[1] = state_idle;
    textbox_story1.draw(story_head[time], story_bottom[time]);
  }
}
