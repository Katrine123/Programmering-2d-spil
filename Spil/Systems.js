let n;

class Stats {
  constructor() {}

  give_stats() {
    int(random(0, 5));
  }

  change_stats() {}
}

class Health {
  constructor() {}
}

class Money {
  constructor() {}
}

function setup() {
  n = new Stats();
  n.give_stats();
  print(n);
}
