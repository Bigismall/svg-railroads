class Train {
  constructor(selector, x = 0, y = 0, speed = 1, position = 0) {
    this.$element = document.querySelector(selector);
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = 1;   //1,-1
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
    this.activeRail = rail1.active ? 0 : 1;
    this.change(this.activeRail);
  }

  change(railNumber) {
    this.activeRail = (undefined !== railNumber)
        ? railNumber % 2
        : (this.activeRail + 1) % 2;
    this.rails.forEach(r => {
      r.active = false;
      r.$element.classList.remove('rail_active');
    });
    this.rails[this.activeRail].active = true;
    this.rails[this.activeRail].$element.classList.add('rail_active');

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
      this.train.direction = 1;

      this.rail = this.rail.getNextRail();
      //TODO consider
      //next rail has star/end points, depend on which point is closer, we should pick it and set train position to it
      //depend on start/end  we should also set direction

      this.train.position = 0;
    }
    //else if (this.train.position <= 0) {
    //this.train.direction = 1;
    //this.rail = this.rail.prev[0];
    //}

    this.train.position += this.train.direction * this.train.speed;
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


const railRoad1 = new Rail('#rail1');
const railRoad2 = new Rail('#rail2', true);
const railRoad3 = new Rail('#rail3');
const railRoad4 = new Rail('#rail4', true);
const railRoad5 = new Rail('#rail5');
const railRoad6 = new Rail('#rail6', true);
const railRoad7 = new Rail('#rail7');
const railRoad8 = new Rail('#rail8');
const railRoad9 = new Rail('#rail9');
const railRoad10 = new Rail('#rail10');
const railRoad11 = new Rail('#rail11');
const railRoad12 = new Rail('#rail12', true);
const railRoad13 = new Rail('#rail13');
const railRoad14 = new Rail('#rail14');
const railRoad15 = new Rail('#rail15');

const $trainSpeed = document.querySelector('#train-speed');

const $switcher214 = document.querySelector('#switcher214');
const $switcher47 = document.querySelector('#switcher47');
const $switcher912 = document.querySelector('#switcher912');
const $switcher611 = document.querySelector('#switcher611');

railRoad1.addPrev(railRoad15);
railRoad1.addNext(railRoad2);
railRoad1.addNext(railRoad14);

railRoad2.addPrev(railRoad1);
railRoad2.addNext(railRoad3);

railRoad3.addPrev(railRoad2);
railRoad3.addNext(railRoad4);
railRoad3.addNext(railRoad7);

railRoad4.addPrev(railRoad3);
railRoad4.addNext(railRoad5);

railRoad5.addPrev(railRoad4);
railRoad5.addNext(railRoad6);

railRoad6.addPrev(railRoad5);
railRoad6.addNext(railRoad15);

railRoad7.addPrev(railRoad3);
railRoad7.addNext(railRoad8);

railRoad8.addPrev(railRoad7);
railRoad8.addNext(railRoad9);
railRoad8.addNext(railRoad12);

railRoad9.addPrev(railRoad8);
railRoad9.addNext(railRoad10);

railRoad10.addPrev(railRoad9);
railRoad10.addNext(railRoad11);

railRoad11.addPrev(railRoad10);
railRoad11.addNext(railRoad15);

railRoad12.addPrev(railRoad8);
railRoad12.addNext(railRoad13);

railRoad13.addPrev(railRoad12);
railRoad13.addNext(railRoad14);

railRoad14.addPrev(railRoad13);
railRoad14.addNext(railRoad1);

railRoad15.addPrev(railRoad11);
railRoad15.addPrev(railRoad6);
railRoad15.addNext(railRoad1);

const switcher214 = new Switcher(railRoad2, railRoad14);
const switcher47 = new Switcher(railRoad4, railRoad7);
const switcher912 = new Switcher(railRoad9, railRoad12);
const switcher611 = new Switcher(railRoad6, railRoad11);

const trainOnRail1 = new TrainOnRail(new Train('.js-train-1', 0, 0, 4, 0),
    railRoad1);

$trainSpeed.addEventListener('change', (e) => {
  trainOnRail1.train.speed = parseInt(e.target.value);
});

$switcher214.addEventListener('click', (e) => {
  switcher214.change();
});
$switcher47.addEventListener('click', (e) => {
  switcher47.change();
});
$switcher912.addEventListener('click', (e) => {
  switcher912.change();
});
$switcher611.addEventListener('click', (e) => {
  switcher611.change();
});

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

