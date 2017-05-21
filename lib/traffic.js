const clock = require('./clock');
const light = require('./light');

const Traffic = Object.create(null);

Traffic.init = function init(opts={}) {
  this.lights = ['N/S', 'W/E'].map((dir, i) => {
    return Object.create(light).init({ 
      direction: dir,
      state: i === 0 ? "GREEN" : "RED"
    });
  });

  this.switch = true;
  return this;
};

Traffic.updateLights = function updateLights({ newTime }) {
  if (this.switch) {
    this.lights[0].update(newTime);

    if (this.lights[0].stopped) this.switch = !this.switch;
  } else {
    this.lights[1].update(newTime);

    if (this.lights[1].stopped) this.switch = !this.switch;
  }
};

Traffic.renderLights = function renderLights() {
  
};

Traffic.runSimulation = function runSimulation() {
  clock
    .init({ 
      renderer: this.renderLights, 
      ticker: this.updateLights.bind(this), 
      fps: 70 
    })
    .start();
};

Traffic.stopSimulation = function stopSimulation() {
  clock.stop();
};

module.exports = Traffic;
