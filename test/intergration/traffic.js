const traffic = require("../../lib/traffic");
const rafStub = require("raf-stub").replaceRaf();

describe.skip("#traffic", function() {
  it("should run simulation for 30min", function(done) {
    this.timeout(30 * 60 * 1000 + 100);

    traffic
      .init({ renderer: () => {}, canvas: false })
      .runSimulation()

    // My computer dosen't like this.
    requestAnimationFrame.flush();

    // Go grab a coffee...
    setTimeout(function() {

      // Stats of the lights for 30min //
      const tracking = traffic.lights[0].tracking.concat(traffic.lights[1].tracking);
      traffic.stopSimulation();
      done();
    }, 30 * 60 * 1000);
  });
});
