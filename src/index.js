import { schedule } from "./renderer";

register("viz", (pat) =>
  pat.onTrigger((hap, currentTime, cps, targetTime) => {
    let duration = hap.duration;
    let begin = (targetTime - currentTime) * 1000 + performance.now();
    let end = duration * 1000 + begin;
    schedule({ span: { begin, end } });
  }, false)
);

let { image, img } = registerControl("image", "img");

window.image = image;
window.img = img;
