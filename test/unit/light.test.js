const assert = require('chai').assert;
const light = require('../../lib/light.js');

describe('#light', function() {
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

    it("should a type error if not given a valid color", function() {
      const shouldThrow = lightInstance.setState.bind(lightInstance, 1);
      assert.throw(shouldThrow, TypeError);
    });
  });

  describe("#getState", function() {
    it("should get the state of the light", function() {
      assert.equal(lightInstance.getState(), "GREEN");
    });
  });
});
