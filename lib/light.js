const now = require("performance-now");

const STATE = {
  GREEN: 1,
  YELLOW: 2,
  RED: 3
};

const DEFAULTS = {
  direction: "N",
  state: "RED",
  milestones: {
    GREEN: 1000, // 1 * 60 * 1000,
    // 30 second yellow light requirement
    YELLOW: 2000, // (30 * 1000) + (1 * 60 * 1000),
    // 5 min duration requirement.
    RED: 4000 // (1 * 60 * 1000) + (30 * 1000) + 100
  },
  render: {
    radius: 10
  }
};

const Lights = Object.create(null);

/**
 * init - initalize the lights class
 * @param  {Object} opts
 * @return {Light}
 */
Lights.init = function init(opts={}) {
  const {
    direction,
    state,
    milestones,
    render
  } = Object.assign({}, DEFAULTS, opts);

  this.renderOpts = render;
  this.direction = direction;
  this.startTime = 0;
  this.milestones = milestones;
  this.stopped = true;
  this.tracking = [];

  this.setState(state);

  return this;
};

/**
 * setState - set the state of the light.
 * @param {string} color
 */
Lights.setState = function setState(color) {
  const colors = Object.keys(STATE);
  const match = colors.some(c => c === color);

  if (!match) {
    throw new TypeError(`${color} is not a valid color, Try any ${colors.join(', ')}`);
  }

  this.state = STATE[color];

  return this;
}

/**
 * getState
 * @return {string}
 */
Lights.getState = function getState() {
  for (let color in STATE) {
    if (STATE.hasOwnProperty(color)) {
      if (STATE[color] === this.state) {
        return color;
      }
    }
  }
};

/**
 * update - check the milestones and the time to 
 * figure out what state should be set.
 * @param  {number} newTime
 * @return {Light}
 */
Lights.update = function update(newTime) {

  const state = this.getState();
  const { GREEN, YELLOW, RED } = this.milestones;

  if (this.stopped) {
    this.start();
  }

  const time = newTime - this.startTime;

  if (time <= GREEN && state !== "GREEN") {
    this.tracking.push(state + " " + this.direction);
    this.setState("GREEN");  
  } else if (time <= YELLOW && time >= GREEN && state !== "YELLOW") {
    this.tracking.push(state + " " + this.direction);
    this.setState("YELLOW");
  } else if (time <= RED && time >= YELLOW && state !== "RED") {
    this.tracking.push(state + " " + this.direction);
    this.setState("RED");
  } else if (state === "RED") {
    this.stopped = true;
  }

  return this;
};

/**
 * start - Starts the begining of the lights state.
 * @return {Light} 
 */
Lights.start = function start() {
  this.stopped = false;
  this.startTime = now();
  return this;
}

/**
 * render
 * @param  {canvas2DContext} ctx
 * @param  {Object} cord A corrdinate vector.
 * @return {Void}
 */
Lights.render = function render(ctx, cord) {
  let opts = this.renderOpts;

  ctx.fillStyle = this.getState().toLowerCase();
  ctx.beginPath();
  ctx.arc(cord.x, cord.y, opts.radius, 0, Math.PI * 2, false);
  ctx.fill();
};

module.exports = Lights;
