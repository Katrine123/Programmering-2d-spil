let change;
class Stats {
  give_stats() {
    let h = int(random(1, 6));
    let a = int(random(0, 6));
    let s = int(random(0, 6));
    let stats = [h, a, s];
    return stats;
  }

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

class Health {}

class Money {
  start_money() {
    let m = int(random(50, 101));
    return m;
  }
  lose_money() {
    player.gold -= 25;
  }

  robbery(sneak, gold) {
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

  pick_pocket(sneak, gold) {
    let chance = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    let done = chance[int(random(sneak, chance.length))];
    if (done > 0) {
      state = "pick-pocket";
      player.gold += int(random(4, 11));
      change = player.gold - gold;
    } else {
      state = "robbery fail pick-pocket";
    }
  }
  store_robbery(sneak, gold) {
    let chance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
    let done = chance[int(random(sneak, chance.length))];
    if (done > 0) {
      state = "store robbery";
      player.gold += int(random(14, 26));
      change = player.gold - gold;
    } else {
      state = "robbery fail store";
    }
  }
  bank_robbery(sneak, gold) {
    let chance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1];
    let done = chance[int(random(sneak, chance.length))];
    if (done > 0) {
      state = "bank robbery";
      player.gold += int(random(29, 51));
      change = player.gold - gold;
    } else {
      state = "robbery fail bank";
    }
  }
}
