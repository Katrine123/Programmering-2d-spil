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
    follower_who.stats.splice(
      p,
      1,
      follower_who.stats[p] + upgrade_values[int(random(0, 10))]
    );
  }
}

class Health {}

class Money {}
