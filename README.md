# traffic-light-simulation
A traffic light simulation. A test given by Safety Culture.

## Prerequesites
To start this project and run it locally you will need to following

  - [node](https://nodejs.org/en/download/)
  - npm or yarn

## Getting started

Run `npm install` or `yarn install`. Wait or grab coffee as npm installs the internet.

To get the a browser simulation run `npm run dev` this should start the simulation up on [http://localhost:8080](http://localhost:8080).

To run the tests, run `npm test` or `yarn test`.

## How it works

There are three main models that traffic-light-simulation needs to simulate lights.

  1. lib/clock.js
  2. lib/light.js
  3. lib/traffic.js

The clock controls the simulation time when to `start` and when to `stop`. It also has the ability to change the interval at which the lights update and render.

The lights contain state about itself. What color it is. When it needs to change color, and when its stopped.

The traffic.js has access to both the clock and lights. It expresses the rules of the simulation. It also provides the update and render functions, and its the starting script for running the simulation.

## Contributions

Because this project uses webpack to contribute you will need to run `npm build` to get the built project.
