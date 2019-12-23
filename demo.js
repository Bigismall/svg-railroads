class Train {
  constructor(selector, x = 0, y = 0, direction = 1, speed = 1, position = 0) {
    this.$element = document.querySelector(selector);
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = speed;
    this.position = position;
    this.angle = 0;
  }
}

class Rail {
  constructor(selector = '') {
    this.$element = document.querySelector(selector);
    this.length = this.$element ? this.$element.getTotalLength() : 0;
  }
}

class TrainOnRail {
  constructor(train, rail) {
    this.train = train;
    this.rail = rail;
    this.DEG = 180 / Math.PI;
  }

  gameLoop() {
    if (this.train.position >= this.rail.length) {
      this.train.direction = -1;
    } else if (this.train.position <= 0) {
      this.train.direction = 1;
    }

    this.train.position += this.train.speed * this.train.direction;
    this.train.x = this.rail.$element.getPointAtLength(this.train.position).x;
    this.train.y = this.rail.$element.getPointAtLength(this.train.position).y;
    this.train.angle =
        180 +
        this.DEG *
        Math.atan2(
            this.rail.$element.getPointAtLength(this.train.position).y -
            this.rail.$element.getPointAtLength(this.train.position - 1).y,
            this.rail.$element.getPointAtLength(this.train.position).x -
            this.rail.$element.getPointAtLength(this.train.position - 1).x,
        );

    this.train.$element.setAttribute(
        'transform',
        `translate(${
            this.rail.$element.getPointAtLength(this.train.position).x
        },${this.rail.$element.getPointAtLength(
            this.train.position).y}) rotate(${
            this.train.angle
        })`,
    );
  }
}

(function() {
  const rail = new Rail('#rail');
  const trainOnRail1 = new TrainOnRail(
      new Train('.js-train-1', 0, 0, 1, 3, 24),
      rail,
  );

  const trainOnRail2 = new TrainOnRail(
      new Train('.js-train-2', 0, 0, 1, 3, 0),
      rail,
  );

  function gameLoop() {
    trainOnRail1.gameLoop();
    trainOnRail2.gameLoop();

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
})();
