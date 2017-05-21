const traffic = require('./lib/traffic');

traffic
  .init({ canvas: street })
  .runSimulation();
