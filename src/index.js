import { schedule } from "./renderer";

register("viz", (pat) =>
  pat.onTrigger((hap, currentTime, cps, targetTime) => {
    let { duration, value } = hap;

    if (typeof value !== "object" || value === null) return;

    if ("s" in value || "note" in value) {
      // Play audio events
      superdough(
        value,
        targetTime,
        duration / cps,
        cps,
        hap.whole?.begin.valueOf()
      );
    }

    if ("image" in value) {
      // Schedule animation events
      let begin = (targetTime - currentTime) * 1000 + performance.now();
      let end = (duration / cps) * 1000 + begin;
      schedule({ span: { begin, end }, value });
    }
  })
);

let { image, img } = registerControl("image", "img");
let { radius, rad } = registerControl("radius", "rad");

window.image = image;
window.img = img;
window.radius = radius;
window.rad = rad;
