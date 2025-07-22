import { WebGLRenderer, Scene, Camera, SphereGeometry } from "three";
import { CircleGeometry, Mesh, MeshBasicMaterial, Color } from "three";

// For now, do this all globally
const context = getDrawContext("animation-canvas", { contextType: "webgl2" });

const renderer = new WebGLRenderer({ context });
const scene = new Scene();
const camera = new Camera();

renderer.render(scene, camera);

interface Hap<T> {
  span: {
    begin: number;
    end: number;
  };
  value: T;
}

type ActiveHap = Hap<{ update?: () => void; destroy: () => void }>;

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
    let mesh = new Mesh(
      new SphereGeometry(1),
      new MeshBasicMaterial({ color: new Color(0xffffff) })
    );

    scene.add(mesh);

    active.push({
      ...hap,
      value: {
        destroy: () => {
          scene.remove(mesh);
        },
      },
    });
  }

  for (let hap of active) {
    // Update drawn haps
  }

  renderer.render(scene, camera);
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
