const traffic = require("../../lib/traffic");

describe("#traffic", function() {
  it("should run simulation for 30min", function(done) {
    this.timeout(30 * 60 * 1000 + 100);

    traffic
      .init({ 
        renderer: () => {}, 
        canvas: false,
        milesstones: {
          GREEN: 1 * 60 * 1000,
          // 30 second yellow light requirement
          YELLOW: (30 * 1000) + (1 * 60 * 1000),
          // 5 min duration requirement.
          RED: (1 * 60 * 1000) + (30 * 1000) + 100
        }
      })
      .runSimulation()

    // Go grab a coffee...
    setTimeout(function() {

      // Stats of the lights for 30min //
      const tracking = traffic.lights[0].tracking.concat(traffic.lights[1].tracking);
      traffic.stopSimulation();

      done();
    }, 30 * 60 * 1000);
  });
});
