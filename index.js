var STATE = {
  GREEN: 1,
  YELLOW: 2,
  RED: 3
}

var trafficLight = {    
  get state() {
    return this.state;
  }

  set state(color) {
    this.state = STATE[color];
  }
}

