const replaceRaf = require("raf-stub").replaceRaf;
const assert = require("chai").assert;
const now = require("performance-now");
const clock = require("../../lib/clock");

replaceRaf();

describe("#clock", function() {
  let clockInstance;

  beforeEach(function() {
    clockInstance = Object.create(clock.init());
    requestAnimationFrame.reset();
  });

  describe("#init", function() {
    it("should return clock with initalized properties", function() {
      assert.equal(clockInstance.tickerIndex, -1, "The frameIndex is not -1");
    });

    it("should accept fps values as a param", function() {
      const fps = 60;
      clockInstance.init(fps);
      assert.equal(clockInstance.fps, fps);
    })
  });

  describe("#start", function() {
    it("should start the clock and save the start time", function() {
      clockInstance.start();
      assert.ok(clockInstance.startTime);
    });
  });

  describe("#stop", function() {
    it("should stop the clock and save the stop time", function() {
      clockInstance.stop();
      assert.ok(clockInstance.stopTime);
    });
  });

  describe("#loop", function() {
    it("should call the callback if enough time has passed", function(done) {
      const then = now();

      function callback(params) {
        assert.equal(params.newTime, then, "The new time was not then same as the controlled new time given");
        assert.equal(params.clockStart, 0, "Start time was not controlled");
        assert.equal(params.tickerIndex, 0, "tickerIndex was not increased by 1");
        done();
      }

      clockInstance.ticker = callback;
      clockInstance.fpms = 20;
      clockInstance.startTime = 0;
      clockInstance.lastTime = 0;
      clockInstance.loop(then);
    });
  });
});
