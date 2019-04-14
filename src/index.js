import { Application, Pixi } from "./config/aliases";
const config = require("./config/config");
import * as load from "./utils/load";
import Smoothie from "./lib/smoothie";
import switchLevel from "./play/controller";
import click from "./utils/click";
import { animateFrame } from "./play/animation";

import { loading } from "./map/initmap";

let app = new Application({
  width: config.global.width,
  height: config.global.height,
  antialias: true,
  forceCanvas: true
});

document.body.appendChild(app.view);

let w = config.global.cellSize * 3;
loading(app.stage, w, 0);
load.loadResources(
  0,
  function(name, progress) {
    loading(app.stage, w, progress);
  },
  function() {
    console.log("resources loaded!");
    setTimeout(() => setup(), 500); // 延迟加载
  }
);
function setup() {
  switchLevel(app.stage, 0);
  click.on(app.stage, app.view);
  function update() {
    animateFrame();
  }
  let smoothie = new Smoothie({
    engine: Pixi,
    renderer: app,
    root: app.stage,
    fps: config.global.fps,
    update: update.bind(this)
  });
  smoothie.start();
}
