let n;

class Stats {
  give_stats() {
    let h = int(random(1, 6));
    let a = int(random(0, 6));
    let s = int(random(0, 6));
    let stats = [h, a, s];
    return stats;
  }

  change_stats() {
    let upgrade_values = [0, 0, 1, 1, 1, 1, 1, 2, 2, 3];
    let p = int(random(0, 3));
    Follower.stats.splice(
      p,
      1,
      Follower.stats[p] + upgrade_values[ranndom(0, 9)]
    );
  }
}

class Health {}

class Money {}
