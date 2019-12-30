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
  constructor(selector = '', isActive = true) {
    this.$element = document.querySelector(selector);
    this.length = this.$element ? this.$element.getTotalLength() : 0;
    this.next = [];
    this.prev = [];
    this._isActive = isActive;
  }

  get isActive() {
    return this._isActive;
  }

  set isActive(value) {
    this._isActive = value;
  }

  addNext(rail) {
    this.next.push(rail);
  }

  addPrev(rail) {
    this.prev.push(rail);
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
      //this.train.direction = -1;
      //TODO next prev depend on direction
      this.rail = this.rail.next[0];
      this.train.position = 0;

    } else if (this.train.position <= 0) {
      //this.train.direction = 1;
      //this.rail = this.rail.prev[0];
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
  const rail1 = new Rail('#rail1', true);
  const rail2 = new Rail('#rail2', true);

  rail1.addNext(rail2);
  rail2.addNext(rail1);
  const trainOnRail1 = new TrainOnRail(new Train('.js-train-1', 0, 0, 1, 3, 24),
      rail1);

  /*
   const trainOnRail2 = new TrainOnRail(
   new Train('.js-train-2', 0, 0, 1, 3, 0),
   rail,
   );
   */
  function gameLoop() {
    trainOnRail1.gameLoop();
    // trainOnRail2.gameLoop();

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
})();
