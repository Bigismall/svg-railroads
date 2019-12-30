class Train {
  constructor(selector, x = 0, y = 0, speed = 1, position = 0) {
    this.$element = document.querySelector(selector);
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.position = position;
    this.angle = 0;
  }
}

class Rail {
  constructor(selector = '', isActive = true) {
    this.$element = document.querySelector(selector);
    this.length = this.$element ? this.$element.getTotalLength() : 0;
    this.isActive = isActive;
    this._next = [];
    this._prev = [];

    if (this.isActive) {
      this.$element.classList.add('rail_active');
    }
  }

  get nextActive() {
    return this._next.find((r) => r.isActive);
  }

  get prevActive() {
    return this._prev.find((r) => r.isActive);
  }

  makeActive() {
    // this._prev = this._prev.map(r=>r.isActive=false);
    // this._next = this._next.map(r=>r.isActive=false);
    this._prev.forEach((p) => {
      p._next = p._next.map(r => {
        r.isActive = false;
        r.$element.classList.remove('rail_active');
        return r;
      });
    });

    this._next.forEach((n) => {
      n._prev = n._prev.map(r => {
        r.isActive = false;
        r.$element.classList.remove('rail_active');
        return r;
      });
    });
    this.isActive = true;
    this.$element.classList.add('rail_active');
  }

  addNext(rail) {
    this._next.push(rail);
  }

  addPrev(rail) {
    this._prev.push(rail);
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
      this.rail = this.rail.nextActive;
      this.train.position = 0;

    } else if (this.train.position <= 0) {
      //this.train.direction = 1;
      //this.rail = this.rail.prev[0];
    }
    this.train.position += this.train.speed;
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
  const railRoad1 = new Rail('#rail1', true);
  const railRoad2 = new Rail('#rail2', true);
  const railRoad3 = new Rail('#rail3', false);
  const $trainSpeed = document.querySelector('#train-speed');
  const $switches = document.querySelectorAll('input[name=switch]');

  railRoad1.addNext(railRoad2);
  railRoad1.addNext(railRoad3);
  railRoad1.addPrev(railRoad2);
  railRoad1.addPrev(railRoad3);

  railRoad2.addNext(railRoad1);
  railRoad2.addPrev(railRoad1);

  railRoad3.addNext(railRoad1);
  railRoad3.addPrev(railRoad1);

  const trainOnRail1 = new TrainOnRail(new Train('.js-train-1', 0, 0, 4, 0),
      railRoad1);

  $trainSpeed.addEventListener('change', (e) => {
    trainOnRail1.train.speed = parseInt(e.target.value);
  });

  Array.from($switches).map((r) =>
      r.addEventListener('change', e => {

        if ('railRoad2' === e.target.value) {
          railRoad2.makeActive();
        } else {
          railRoad3.makeActive();
        }
      }),
  );

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
