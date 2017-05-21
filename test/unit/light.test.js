const now = require("performance-now");
const assert = require("chai").assert;
const light = require("../../lib/light.js");

describe("#light", function() {
  let lightInstance;

  beforeEach(function() {
    lightInstance = light.init();
  });

  describe("#init", function() {
    it("should set the state thats passed in", function() {
      lightInstance.init({ state: "GREEN" });
      assert.equal(light.state, 1);
    });
  });

  describe("#setState", function() {
    it("should set the state of the light", function() {
      lightInstance.setState("YELLOW");
      assert.equal(
        lightInstance.getState(), 
        "YELLOW", 
        "The state of the light is not the same as the state passed in."
      );
    });

    it("should throw a type error if not given a valid color", function() {
      const shouldThrow = lightInstance.setState.bind(lightInstance, 1);
      assert.throw(shouldThrow, TypeError);
    });
  });

  describe("#getState", function() {
    it("should get the state of the light", function() {
      assert.equal(lightInstance.getState(), "RED");
    });
  });

  describe("#start", function() {
    it("should record the time of when it was called", function () {
      lightInstance.start();
      const expected = now();
      // We need to round the numbers cause of the i/o speeds. Probably will be
      // inconsistent between machines. Not sure on what to do here.. it passes
      // on mine machine ¯\_(ツ)_/¯.
      assert.equal(Math.round(lightInstance.startTime), Math.round(expected));
    });
  });

  describe("#render", function() {
    it.skip("should render a light", function(){})
  })
});
