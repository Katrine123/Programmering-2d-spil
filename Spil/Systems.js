let change;
class Stats {
  //gives stats to follower when made
  give_stats() {
    let h = int(random(1, 6));
    let a = int(random(0, 6));
    let s = int(random(0, 6));
    let stats = [h, a, s];
    return stats;
  }
  //upgrades a stat from shcool
  change_stats(follower) {
    let upgrade_values = [0, 0, 1, 1, 1, 1, 1, 2, 2, 3];
    let p = int(random(0, 3));
    follower.stats.splice(
      p,
      1,
      follower.stats[p] + upgrade_values[int(random(0, 10))]
    );
  }
}

class Money {
  //gives start money
  start_money() {
    let m = int(random(50, 101));
    return m;
  }
  //takes money
  lose_money() {
    player.gold -= 25;
  }

  //chooses type of robbery
  robbery(sneak, gold) {
    // values so there is 60% chance for pickpocket, 30% for storerobbery, 10% for bank robbery
    let values = [1, 1, 1, 1, 1, 1, 2, 2, 2, 3];
    let type = values[int(random(0, 9))];
    if (type == 1) {
      this.pick_pocket(sneak, gold);
    } else if (type == 2) {
      this.store_robbery(sneak, gold);
    } else if (type == 3) {
      this.bank_robbery(sneak, gold);
    }
  }

  //pick-pocket robbery
  pick_pocket(sneak, gold) {
    //array with 8 zeros and 12 ones
    let chance = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    // picks number from chance depending of followers sneak stat, if high sneak bigger chance of 1
    // same system for store and bank robbery, only differens is amount of zeros and ones.
    let done = chance[int(random(sneak, chance.length))];
    if (done > 0) {
      state = "pick-pocket";
      player.gold += int(random(9, 16));
      change = player.gold - gold;
    } else {
      state = "robbery fail pick-pocket";
    }
  }
  //store robbery
  store_robbery(sneak, gold) {
    let chance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
    let done = chance[int(random(sneak, chance.length))];
    if (done > 0) {
      state = "store robbery";
      player.gold += int(random(19, 31));
      change = player.gold - gold;
    } else {
      state = "robbery fail store";
    }
  }
  // bank robbery
  bank_robbery(sneak, gold) {
    let chance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1];
    let done = chance[int(random(sneak, chance.length))];
    if (done > 0) {
      state = "bank robbery";
      player.gold += int(random(39, 71));
      change = player.gold - gold;
    } else {
      state = "robbery fail bank";
    }
  }
}
