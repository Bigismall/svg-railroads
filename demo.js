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
  constructor(selector = '', isActive = false) {
    this.$element = document.querySelector(selector);
    this.length = this.$element ? this.$element.getTotalLength() : 0;
    this.active = isActive;
    this._next = [];
    this._prev = [];

    if (this.active) {
      this.$element.classList.add('rail_active');
    }
  }

  getNextRail() {
    switch (this._next.length) {
      case 0:
        throw Error('No rails avaible');
      case 1:
        return this._next[0];
      case 2:
        return this.nextActive;
    }
  }

  get nextActive() {
    return this._next.find((r) => r.active);
  }

  get prevActive() {
    return this._prev.find((r) => r.active);
  }

  makeActive() {
    this._prev.forEach((p) => {
      p._next = p._next.map(r => {
        r.active = false;
        r.$element.classList.remove('rail_active');
        return r;
      });
    });

    this._next.forEach((n) => {
      n._prev = n._prev.map(r => {
        r.active = false;
        r.$element.classList.remove('rail_active');
        return r;
      });
    });

    this.active = true;
    this.$element.classList.add('rail_active');
  }

  addNext(rail) {
    this._next.push(rail);
  }

  addPrev(rail) {
    this._prev.push(rail);
  }
}

class Switcher {

  constructor(rail1, rail2) {
    this.rails = [rail1, rail2];
    this.activeRail = rail1.isActive ? 0 : 1;
    this.rails[this.activeRail].makeActive();
  }

  change(railNumber) {
    this.activeRail = railNumber ? railNumber % 2 : (this.activeRail + 1) % 2;
    this.rails[this.activeRail].makeActive();
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
      this.rail = this.rail.getNextRail();
      this.train.position = 0;

    } else if (this.train.position <= 0) {
      //this.train.direction = 1;
      //this.rail = this.rail.prev[0];
    }
    this.train.position += this.train.speed;
    this.train.x = this.rail.$element.getPointAtLength(this.train.position).x;
    this.train.y = this.rail.$element.getPointAtLength(this.train.position).y;
    this.train.angle = 180 + this.DEG * Math.atan2(
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
/*
  const railRoad1 = new Rail('#rail1');
  const railRoad2 = new Rail('#rail2', true);
  const railRoad3 = new Rail('#rail3', true);
  const railRoad4 = new Rail('#rail4', true);
  const railRoad5 = new Rail('#rail5');
  //const railRoad6 = new Rail('#rail6');
  const railRoad7 = new Rail('#rail7');
  const railRoad8 = new Rail('#rail8', true);
  const railRoad9 = new Rail('#rail9');

  const $trainSpeed = document.querySelector('#train-speed');

  const $switcher35 = document.querySelector('#switcher35');
  const $switcher78 = document.querySelector('#switcher78');
  const $switcher47 = document.querySelector('#switcher47');
  const $switcher29 = document.querySelector('#switcher29');

  railRoad1.addNext(railRoad2);
  railRoad1.addNext(railRoad9);
  railRoad1.addPrev(railRoad4);
  railRoad1.addPrev(railRoad7);

  railRoad2.addNext(railRoad3);
  railRoad2.addNext(railRoad5);
  railRoad2.addPrev(railRoad1);

  railRoad3.addNext(railRoad4);
  railRoad3.addPrev(railRoad2);

  railRoad4.addNext(railRoad1);
  railRoad4.addPrev(railRoad3);

  railRoad5.addNext(railRoad7);
  railRoad5.addNext(railRoad8);
  railRoad5.addPrev(railRoad2);

  railRoad7.addNext(railRoad1);
  railRoad7.addPrev(railRoad5);

  railRoad8.addNext(railRoad9);
  railRoad8.addPrev(railRoad5);

  railRoad9.addNext(railRoad1);
  railRoad9.addPrev(railRoad8);

  const switcher35 = new Switcher(railRoad3, railRoad5);
  const switcher78 = new Switcher(railRoad7, railRoad8);
  const switcher47 = new Switcher(railRoad4, railRoad7);
  //const switcher29 = new Switcher(railRoad2, railRoad9);

  const trainOnRail1 = new TrainOnRail(new Train('.js-train-1', 0, 0, 4, 0),
      railRoad1);

  $trainSpeed.addEventListener('change', (e) => {
    trainOnRail1.train.speed = parseInt(e.target.value);
  });

 */
/*
  $switcher35.addEventListener('click', (e) => {
    switcher35.change();
  });
  $switcher78.addEventListener('click', (e) => {
    switcher78.change();
  });
  $switcher47.addEventListener('click', (e) => {
    switcher47.change();
  });
*/
  /*
   const trainOnRail2 = new TrainOnRail(
   new Train('.js-train-2', 0, 0, 1, 3, 0),
   rail,
   );
   */
  function gameLoop() {
   // trainOnRail1.gameLoop();
    // trainOnRail2.gameLoop();

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
})();
