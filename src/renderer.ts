import {
  WebGLRenderer,
  Scene,
  Object3D,
  PerspectiveCamera,
  Vector2,
} from "three";

import { Shape, ShapeDef, Hap } from "./types";
import { circle } from "./shapes";

// Loaded shapes
const shapes: { [name: string]: ShapeDef<any> } = { circle };

type Dimensions = [number, number];

export class Renderer {
  private renderer: WebGLRenderer;
  private scene: Scene;

  constructor(context: WebGLRenderingContext) {
    this.renderer = new WebGLRenderer({ context, antialias: true });
    this.scene = new Scene();

    this.camera = new PerspectiveCamera();
    this.camera.position.setZ(5);

    this.checkDimensions();

    this.scene.add(this.camera);
  }

  add(object: Object3D) {
    this.scene.add(object);
  }

  remove(object: Object3D) {
    this.scene.remove(object);
  }

  private camera: PerspectiveCamera;

  private dimensions: Dimensions = [0, 0];

  getViewSize() {
    return this.camera.getViewSize(5, new Vector2());
  }

  getPositionInView(x: number, y: number) {
    let position = new Vector2(x, y);
    let viewSize = this.getViewSize();

    // Scale position coordinates
    position.multiply(viewSize);
    position.sub(new Vector2(0.5, 0.5).multiply(viewSize));

    return position;
  }

  private checkDimensions() {
    let [oldWidth, oldHeight] = this.dimensions;
    let { width, height } = this.renderer.getContext().canvas;

    if (width !== oldWidth || height !== oldHeight) {
      this.dimensions = [width, height];
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
  }

  render() {
    // TODO: Get this working in real time with rescalings of the canvas
    // this.checkDimensions();

    this.renderer.render(this.scene, this.camera);
  }
}

// For now, do this all globally
const context = getDrawContext("animation-canvas", { contextType: "webgl2" });
const renderer = new Renderer(context);

type ActiveHap = Hap<Shape>;

let scheduled: Hap<unknown>[] = [];
let active: ActiveHap[] = [];

export function schedule(hap: Hap<unknown>) {
  scheduled.push(hap);
}

function draw(time: number) {
  // Filter out upcoming scheduled events

  let activating: Hap<unknown>[];
  [activating, scheduled] = partition(
    // TODO: Framerate-based lookahead etc
    (hap) => hap.span.begin < time,
    scheduled
  );

  let deactivating: ActiveHap[];
  [deactivating, active] = partition((hap) => hap.span.end < time, active);

  for (let hap of deactivating) {
    hap.value.destroy();
  }

  for (let hap of activating) {
    if (
      typeof hap.value === "object" &&
      hap.value !== null &&
      "image" in hap.value
    ) {
      if (typeof hap.value.image === "string" && hap.value.image in shapes) {
        active.push({
          ...hap,
          value: shapes[hap.value.image](hap, renderer),
        });
      } else {
        // Console log that the shape is not loaded or something?
      }
    }
  }

  for (let hap of active) {
    // Update drawn haps
    hap.value.update?.(time);
  }

  renderer.render();
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

function partition<T>(test: (value: T) => boolean, list: T[]) {
  return list.reduce<[T[], T[]]>(
    (lists, current) => {
      lists[test(current) ? 0 : 1].push(current);
      return lists;
    },
    [[], []]
  );
}
