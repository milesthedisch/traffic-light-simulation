const clock = require('./clock');
const light = require('./light');

const Traffic = Object.create(null);

/**
 * init
 * @param  {Object} opts
 * @return {Traffic}
 */
Traffic.init = function init(opts={}) {
  this.opts = Object.assign({
    renderer: this.renderLights,
    update: this.updateLights,
    lightOffset: 200
  }, opts);

  this.lights = ['N/S', 'W/E'].map((dir, i) => {
    return Object.create(light).init({ 
      direction: dir,
      milesstones: opts.milesstones
    });
  });

  this.switch = false;

  return this;
};

/**
 * updateLights
 * @param  {number} options.newTime The time requestAnimationFrame was called.
 * @return {Void}
 */
Traffic.updateLights = function updateLights({ newTime }) {
  if (this.switch) {
    this.lights[0].update(newTime);

    if (this.lights[0].stopped) this.switch = !this.switch;
  } else if (!this.switch) {
    this.lights[1].update(newTime);

    if (this.lights[1].stopped) this.switch = !this.switch;
  }
};

/**
 * setupCanvas - Makes the canvas fullscreen and grabs context
 * @return {Void}
 */
Traffic.setupCanvas = function setupCanvas() {
  street.width = window.innerWidth;
  street.height = window.innerHeight;

  // The id on the canvas become a global variable.
  this.drawingCtx = this.opts.canvas.getContext("2d");
};

/**
 * calcCordinates - Calculate the corrdinate to place the lights.
 * @return {Traffic}
 */
Traffic.calcCordinates = function calcCordinates() {
  this.orgX = street.width / 2;
  this.orgY = street.height / 2;

  // Offset from origin //
  this.lightOffset = this.opts.lightOffset;

  this.northCord = this.orgY - this.lightOffset;
  this.southCord = this.orgY + this.lightOffset;
  this.eastCord = this.orgX + this.lightOffset;
  this.westCord = this.orgX - this.lightOffset;

  return this;
};

/**
 * renderLights - Calls the render function of each light passing in data.
 * @return {Void}
 */
Traffic.renderLights = function renderLights() {
  this.drawingCtx.clearRect(0, 0, street.width, street.height);

  this.lights[0].render(this.drawingCtx, {x: this.orgX, y: this.northCord});
  this.lights[0].render(this.drawingCtx, {x: this.orgX, y: this.southCord});
  this.lights[1].render(this.drawingCtx, {x: this.eastCord, y: this.orgY});
  this.lights[1].render(this.drawingCtx, {x: this.westCord, y: this.orgY});
};

/**
 * runSimulation - Runs the traffic simulation.
 * @return {Traffic}
 */
Traffic.runSimulation = function runSimulation() {
  if (this.opts.canvas) {
    this.setupCanvas();
    this.calcCordinates();
  }

  clock
    .init({ 
      renderer: this.opts.renderer.bind(this), 
      ticker: this.opts.update.bind(this), 
      fps: 70 
    })
    .start();

  return this;
};

/**
 * stopSimulation - Stops the simulation
 * @return {Traffic}
 */
Traffic.stopSimulation = function stopSimulation() {
  clock.stop();
  return this;
};

module.exports = Traffic;
