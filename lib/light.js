const now = require("performance-now");

const STATE = {
  GREEN: 1,
  YELLOW: 2,
  RED: 3
};

const DEFAULTS = {
  direction: "N",
  state: "GREEN",
  milestones: {
    GREEN: 1000,
    YELLOW: 3000,
    RED: 5000
  },
};

const Lights = Object.create(null);

Lights.init = function init(opts={}) {
  const {
    direction,
    state,
    milestones
  } = Object.assign({}, DEFAULTS, opts);

  this.direction = direction;
  this.startTime = 0;
  this.milestones = milestones;
  this.stopped = false;
  this.setState(state);

  return this;
};

Lights.setState = function setState(color) {
  const colors = Object.keys(STATE);
  const match = colors.some(c => c === color);

  if (!match) {
    throw new TypeError(`${color} is not a valid color, Try any ${colors.join(', ')}`);
  }

  this.state = STATE[color];

  return this;
}

Lights.getState = function getState() {
  for (let color in STATE) {
    if (STATE.hasOwnProperty(color)) {
      if (STATE[color] === this.state) {
        return color;
      }
    }
  }
};

Lights.update = function update(newTime) {
  if (this.stopped) {
    this.start();
  }

  const time = newTime - this.startTime;
  const state = this.getState();
  const { GREEN, YELLOW, RED } = this.milestones;

  if (time <= GREEN && state !== "GREEN") {
    this.setState("GREEN");  
  } else if (time <= YELLOW && time >= GREEN && state !== "YELLOW") {
    this.setState("YELLOW");
  } else if (time <= RED && time >= YELLOW && state !== "RED") {
    this.setState("RED");
  } else if (time > RED) {
    this.stopped = true;
  }

};

Lights.start = function start() {
  this.stopped = false;
  this.startTime = now();
}

module.exports = Lights;
