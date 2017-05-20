const Clock = Object.create(null);
const MAX_FPS = 60;

/**
 * init - Initalizes the clock with correct properties.
 * @param  {Object} opts
 * @param  {Number} opts.fps The fps you want the clock to tick at.
 * @return {Clock}
 */
Clock.init = function initClock(fps=MAX_FPS) {
  // Zero based frame count.
  this.callIndex = -1;

  // Save a reference to the animation frame so we can cancel it
  this.rAF = 0;

  // Time properties
  this.startTime;
  this.lastTime;
  this.stopTime;
  this.timeSinceStart = 0;

  // The maximum FPS the browser can deliver is 60.
  this.fps = fps > MAX_FPS ? MAX_FPS : fps

  return this;
};

/**
 * start - Starts the clock with starting time properties.
 * @param  {Number} fps The fps you want the clock to tick at.
 * @return {Clock}
 */
Clock.start = function start(fps=60) {
  if (fps > 60) {
    throw new Error(`The given ${fps} is too high`);
  }

  if (+fps === NaN) {
    throw new Error(`The given ${fps} is not valid`);
  }

  this.fps = 1000 / fps;
  this.startTime = performance.now();
  this.lastTime = this.startTime;

  // Start ticking
  this.loop(this.startTime);
  return this;
};

/**
 * tick
 * @param  {Number} newTime A value in ms that is equal to the current time.
 * @return {Clock}
 */
Clock.loop = function loop(newTime, callback) {
  this.rAF = requestAnimationFrame(loop.bind(this));

  let delta = newTime - this.lastTime;
  this.timeSinceStart = newTime - this.startTime;

  if (delta > this.fps) {
    this.callIndex++;
    callback({
      newTime,
      delta,
      callIndex: this.callIndex,
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
  this.stopTime = performance.now();
  this.timeSinceStart += this.stopTime - this.startTime;

  if (typeof callback === 'function') {
    return callback(this.stopTime);
  }
  return this;
};

module.exports = Clock;
