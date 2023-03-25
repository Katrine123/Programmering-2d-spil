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

  robbery() {
    let values = [1, 1, 1, 1, 1, 2, 2, 2, 3, 3];
    let type = values[int(random(0, 9))];
    if (type == 1) {
      state = "pick-pocket";
      player.gold += int(random(4, 11));
    } else if (type == 2) {
      state = "store robbery";
      player.gold += int(random(14, 26));
    } else if (type == 3) {
      state = "bank robbery";
      player.gold += int(random(29, 51));
    }
  }
}
