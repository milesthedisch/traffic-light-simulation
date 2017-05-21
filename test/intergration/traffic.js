const traffic = require("../../lib/traffic");
const rafStub = require("raf-stub").replaceRaf();

describe.only("#traffic", function() {
  it("should run simulation for 30min", function(done) {
    this.timeout(30 * 60 * 1000 + 100);

    traffic
      .init()
      .runSimulation()

    // My computer dosen't like this.
    requestAnimationFrame.flush();

    // Go grab a coffee...
    setTimeout(function() {
      traffic.stopSimulation();
      done();
    }, 30 * 60 * 1000);
  });
});
