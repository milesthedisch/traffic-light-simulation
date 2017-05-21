const traffic = require('./lib/traffic');

traffic
  .init({ 
    canvas: street,
    milestones: { 
      GREEN: 1000, // 1 * 60 * 1000
      YELLOW: 2000, // (30 * 1000) + (1 * 60 * 1000),
      // 5 min duration requirement.
      RED: 4000 // (1 * 60 * 1000) + (30 * 1000) + 100
    },
  })
  .runSimulation();
