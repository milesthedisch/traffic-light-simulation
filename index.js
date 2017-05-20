const clock = require('./lib/clock');

const clockInstance = Object.create(clock);
clockInstance.init();
clockInstance.start(0, function() {
  console.log("TICK");
});
