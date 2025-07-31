import { schedule, defineDrawing, drawingCanvas } from "./renderer";

window.defineDrawing = defineDrawing;
window.drawingCanvas = drawingCanvas;

register("viz", (pat) =>
  pat.onTrigger((hap, currentTime, cps, targetTime) => {
    let { duration, value } = hap;

    // Schedule animation events
    let begin = (targetTime - currentTime) * 1000 + performance.now();
    let end = (duration / cps) * 1000 + begin;
    schedule({ span: { begin, end }, value });
  })
);

import * as shapes from "./shapes";

Object.assign(window, shapes);

let { draw } = registerControl("draw");
let { radius, rad } = registerControl("radius", "rad");
let { rotation, rot } = registerControl("rotation", "rot");
let { wide } = registerControl("wide");
let { tall } = registerControl("tall");

Object.assign(window, { draw, radius, rad, rotation, rot, wide, tall });
