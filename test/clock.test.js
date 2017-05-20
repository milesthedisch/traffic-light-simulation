const rafStub = require('raf-stub');
const assert = require('chai').assert;
const clock = require('../lib/clock');


describe("#clock", function() {
  let clockInstance = Object.create(clock);

  beforeEach(function() {
    clockInstance = Object.create(clock);
  });

  afterEach(function() {

  });

  describe("init", function() {
    it("should return clock with initalized properties", function() {
      clockInstance.init();
      assert.equal(clockInstance.callIndex, -1, 'The frameIndex is not -1');
    });

    it("should accept fps values as a param", function() {
      const fps = 60;

      clockInstance.init(fps);
      assert.equal(clockInstance.fps, fps);
    })
  });

  describe("start", function() {

  });

  describe("stop", function() {

  });

  describe("loop", function() {

  });
});
