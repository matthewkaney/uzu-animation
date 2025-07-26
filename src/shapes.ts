import { Mesh, CircleGeometry, MeshBasicMaterial, Color } from "three";

import { ShapeDef } from "./types";

interface CircleProps {
  x: number;
  y: number;
  radius: number;
  color: string;
}

let circleDefaults: CircleProps = {
  x: 0.5,
  y: 0.5,
  radius: 0.25,
  color: "#ffffff",
};

const circleGeometry = new CircleGeometry(1);

export const circle: ShapeDef<CircleProps> = (hap, renderer) => {
  let { x, y, radius, color } = { ...circleDefaults, ...hap.value };

  let mesh = new Mesh(
    circleGeometry,
    new MeshBasicMaterial({ color: new Color(color) })
  );

  renderer.add(mesh);

  mesh.scale.set(radius, radius, 1);

  return {
    update: () => {
      let scaled = renderer.getPositionInView(x, y);
      mesh.position.set(scaled.x, scaled.y, 0);
    },
    destroy: () => {
      renderer.remove(mesh);
    },
  };
};
