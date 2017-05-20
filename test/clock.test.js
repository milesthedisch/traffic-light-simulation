const rafStub = require('raf-stub').replaceRaf();
const now = require('performance-now');
const assert = require('chai').assert;
const clock = require('../lib/clock');


describe("#clock", function() {
  let clockInstance;

  beforeEach(function() {
    clockInstance = Object.create(clock.init());
    requestAnimationFrame.reset();
  });

  describe("init", function() {
    it("should return clock with initalized properties", function() {
      assert.equal(clockInstance.callIndex, -1, 'The frameIndex is not -1');
    });

    it("should accept fps values as a param", function() {
      const fps = 60;
      clockInstance.init(fps);
      assert.equal(clockInstance.fps, fps);
    })
  });

  describe("start", function() {
    it("should start the clock and save the start time", function() {
      clockInstance.start();
      assert.ok(clockInstance.startTime);
    });
  });

  describe("stop", function() {
    it("should stop the clock and save the stop time", function() {
      clockInstance.stop();
      assert.ok(clockInstance.stopTime);
    });
  });

  describe("loop", function() {
    it("should call the callback if enough time has passed", function(done) {
      const then = now();

      function callback(params) {
        assert.equal(params.newTime, then, 'The new time was not then same as the controlled new time given');
        assert.equal(params.clockStart, 0, 'Start time was not controlled');
        assert.equal(params.callIndex, 0, 'callIndex was not increased by 1');
        done();
      }

      clockInstance.fpms = 20;
      clockInstance.startTime = 0;
      clockInstance.lastTime = 0;
      clockInstance.loop(then, callback);
    });
  });
});
