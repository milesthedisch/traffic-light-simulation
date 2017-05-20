const clock = require('./lib/clock');

window.clock = clock;

function checkLights(lights) {
  if (!lights.length) {
    throw new TypeError(`${lights} is not an array`);
  }

}

clock.init(1, () => {console.log('TICK!')});
clock.start();
