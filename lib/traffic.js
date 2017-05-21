const clock = require('./clock');
const light = require('./light');

const Traffic = Object.create(null);

Traffic.init = function init(opts={}) {
  this.opts = Object.assign({
    renderer: this.renderLights,
    update: this.updateLights,
    lightOffset: 200,
    canvas: street,
  }, opts);

  this.lights = ['N/S', 'W/E'].map((dir, i) => {
    return Object.create(light).init({ 
      direction: dir
    });
  });

  this.renderer = this.opts.renderer;
  this.update = this.opts.update;
  this.switch = false;

  return this;
};

Traffic.updateLights = function updateLights({ newTime }) {
  if (this.switch) {
    this.lights[0].update(newTime);

    if (this.lights[0].stopped) this.switch = !this.switch;
  } else if (!this.switch) {
    this.lights[1].update(newTime);
    console.log(this.lights[1].stopped);
    if (this.lights[1].stopped) this.switch = !this.switch;
  }
};

Traffic.setupCanvas = function setupCanvas() {
  street.width = window.innerWidth;
  street.height = window.innerHeight;

  // The id on the canvas become a global variable.
  this.drawingCtx = this.opts.canvas.getContext("2d");

  if (dat.gui) {
    this.gui = new dat.GUI();
    gui.add(this.lights[0].milestones, 'GREEN');
    gui.add(this.lights[0].milestones, 'YELLOW');
    gui.add(this.lights[0].milestones, 'RED');   
  } 
};

Traffic.calcCordinates = function calcCordinates() {
  this.orgX = street.width / 2;
  this.orgY = street.height / 2;

  // Offset from origin //
  this.lightOffset = this.opts.lightOffset;

  this.northCord = this.orgY - this.lightOffset;
  this.southCord = this.orgY + this.lightOffset;
  this.eastCord = this.orgX + this.lightOffset;
  this.westCord = this.orgX - this.lightOffset;
};

Traffic.renderLights = function renderLights() {
  this.drawingCtx.clearRect(0, 0, street.width, street.height);

  this.lights[0].render(this.drawingCtx, {x: this.orgX, y: this.northCord});
  this.lights[0].render(this.drawingCtx, {x: this.orgX, y: this.southCord});
  this.lights[1].render(this.drawingCtx, {x: this.eastCord, y: this.orgY});
  this.lights[1].render(this.drawingCtx, {x: this.westCord, y: this.orgY});
};

Traffic.runSimulation = function runSimulation() {
  this.setupCanvas();
  this.calcCordinates();
  clock
    .init({ 
      renderer: this.renderer.bind(this), 
      ticker: this.updateLights.bind(this), 
      fps: 70 
    })
    .start();
};

Traffic.stopSimulation = function stopSimulation() {
  clock.stop();
};

module.exports = Traffic;
