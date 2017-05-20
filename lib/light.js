const STATE = {
  "GREEN": 1,
  "YELLOW": 2,
  "RED": 3
};

const DEFAULTS = {
  direction: "N",
  state: "GREEN",
  duration: 9000,
};

const Lights = Object.create(null);

Lights.init = function init(opts={}) {
  const {
    direction,
    state,
    duration
  } = Object.assign({}, DEFAULTS, opts);

  this.direction = direction;
  this.duration = duration;
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

module.exports = Lights;
