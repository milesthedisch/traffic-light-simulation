const now = require("performance-now");
const Clock = Object.create(null);

const DEFAUTS = {
  fps: 60,
  renderer: ()=>{},
  ticker: ()=>{},
}

/**
 * init - Initalizes the clock with correct properties.
 * @param  {Object} opts
 * @param  {Number} opts.fps The fps you want the clock to tick at.
 * @return {Clock}
 */
Clock.init = function initClock(opts={}) {
  const {ticker, renderer, fps} = Object.assign({}, DEFAUTS, opts);

  // Zero based frame count.
  this.tickerIndex = -1;

  // Save a reference to the animation frame so we can cancel it
  this.rAF = 0;

  // Time properties
  this.startTime;
  this.lastTime;
  this.stopTime;
  this.timeSinceStart = 0;
  this.ticker = ticker;
  this.renderer = renderer;

  // The maximum FPS the browser can deliver is 60.
  this.fps = fps > 60 ? 60 : fps

  return this;
};

/**
 * start - Starts the clock with starting time properties.
 * @param  {Number} fps The fps you want the clock to tick at.
 * @return {Clock}
 */
Clock.start = function start(tick) {

  // Frames per millisecond
  this.fpms = 1000 / this.fps;
  this.startTime = now();
  this.lastTime = this.startTime;

  // Start ticking
  this.loop(this.startTime, tick);
  return this;
};

/**
 * tick
 * @param  {Number} newTime A value in ms that is equal to the current time.
 * @return {Clock}
 */
Clock.loop = function loop(newTime) {
  this.rAF = requestAnimationFrame(loop.bind(this));

  let delta = newTime - this.lastTime;
  this.timeSinceStart = newTime - this.startTime;

  this.renderer({
    newTime, 
    delta, 
    timeSinceStart: this.timeSinceStart
  });

  if (delta > this.fpms) {
    this.tickerIndex++;

    this.ticker({
      newTime,
      delta,
      tickerIndex: this.tickerIndex,
      lastTime: this.lastTime,
      clockStart: this.startTime,
      timeSinceStart: this.timeSinceStart,
    });

    this.lastTime = newTime - (delta % this.fps);
  }

  return this;
};

/**
 * stop - Stop the clock and call the last tick if needed.
 * @return {Clock}
 */
Clock.stop = function stopClock(callback) {
  cancelAnimationFrame(this.rAF);

  // Record when we stopped.
  this.stopTime = now();
  this.timeSinceStart = this.stopTime - this.startTime;

  return this;
};

module.exports = Clock;
