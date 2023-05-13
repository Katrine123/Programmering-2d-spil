//Statemachinen. Indelt en smule for at gøre det mere overskueligt

class StateMachine {
  constructor() {
    this.mainState;
    this.miniState;
    this.followerMachine = new StateMachine_follower();
    this.schoolMachine = new StateMachine_school();
  }
  use(machineState_main, machineState_mini) {
    if (machineState_main == "Follower") {
      this.followerMachine.use(machineState_mini);
    }
    if (machineState_main == "School") {
      this.schoolMachine.use(machineState_mini);
    }
  }
}

class StateMachine_follower {
  constructor() {}
  use(machineState) {
    machineState;
    //Cultist screen.
    if (machineState == "cultist") {
      choices[0] = try_convince;
      choices[1] = dont_convince;
      textbox_cultist.draw(cultist[0], cultist[1]);
    }
    //Success screen
    //Flere cultister
    if (machineState == "convince") {
      choices[0] = state_idle;
      if (followers.length > 1) {
        textbox_continue.draw(
          follower_convince_head[0],
          follower_convince_bottom[0]
        );
      }
      //1 cultist
      if (followers.length == 1) {
        textbox_continue.draw(
          follower_convince_head[1],
          follower_convince_bottom[1]
        );
      }
    }
    //Faliure screen
    if (machineState == "cant_convince") {
      choices[0] = state_idle;
      textbox_continue.draw(
        follower_convince_head[2],
        follower_convince_bottom[2]
      );
    }
    //Leave them be screen:
    if (machineState == "dont_convince") {
      choices[0] = state_idle;
      textbox_continue.draw(
        follower_convince_head[3],
        follower_convince_bottom[3]
      );
    }
    //5 cultister skærm
    if (machineState == "full") {
      choices[0] = state_idle;
      textbox_continue.draw(
        follower_convince_head[4],
        follower_convince_bottom[4]
      );
    }
  }
}

class StateMachine_school {
  constructor() {
    this.state;
  }
  use(machineState) {
    //School screen
    if (machineState == "school") {
      choices[0] = school_yes;
      choices[1] = school_no;
      textbox_school.draw(school_head[0], school_bottom[0]);
    }

    //School Yes screen
    if (machineState == "school_yes") {
      choices[0] = state_idle;
      textbox_continue.draw(school_head[1], school_bottom[1]);
    }
    //School No screen
    if (machineState == "school_no") {
      choices[0] = state_idle;
      textbox_continue.draw(school_head[2], school_bottom[2]);
    }
    //School No money screen
    if (machineState == "no_money") {
      choices[0] = state_idle;
      textbox_continue.draw(school_head[3], school_bottom[3]);
    }
  }
}
