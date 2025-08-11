import {
  Mesh,
  CircleGeometry,
  MeshBasicMaterial,
  Color,
  PlaneGeometry,
  RingGeometry,
} from "three";

import { ShapeDef } from "./types";

interface ShapeProps {
  x: number;
  y: number;
  wide?: number;
  tall?: number;
  rotation: number;
  color: string;
}

let shapeDefaults: ShapeProps = {
  x: 0.5,
  y: 0.5,
  rotation: 0,
  color: "#ffffff",
};

interface CircleProps extends ShapeProps {
  radius: number;
}

let circleDefaults: CircleProps = {
  ...shapeDefaults,
  radius: 0.5,
};

const circleGeometry = new CircleGeometry(0.5);

export const circle: ShapeDef<CircleProps> = (hap, renderer) => {
  let { color } = { ...circleDefaults, ...hap.value };

  let mesh = new Mesh(
    circleGeometry,
    new MeshBasicMaterial({ color: new Color(color) })
  );

  renderer.add(mesh);

  return {
    update: (time, controls) => {
      let { x, y, radius, wide, tall } = {
        ...circleDefaults,
        ...controls,
      };
      mesh.scale.set(wide ?? 2 * radius ?? 1, tall ?? 2 * radius ?? 1, 1);
      let scaled = renderer.getPositionInView(x, y);
      mesh.position.set(scaled.x, scaled.y, 0);
    },
    destroy: () => {
      renderer.remove(mesh);
    },
  };
};

const ringGeometry = new RingGeometry(0.25, 0.5);

export const ring: ShapeDef<CircleProps> = (hap, renderer) => {
  let { color } = { ...circleDefaults, ...hap.value };

  let mesh = new Mesh(
    ringGeometry,
    new MeshBasicMaterial({ color: new Color(color) })
  );

  renderer.add(mesh);

  return {
    update: (time, controls) => {
      let { x, y, radius, wide, tall } = {
        ...circleDefaults,
        ...controls,
      };
      mesh.scale.set(wide ?? 2 * radius ?? 1, tall ?? 2 * radius ?? 1, 1);
      let scaled = renderer.getPositionInView(x, y);
      mesh.position.set(scaled.x, scaled.y, 0);
    },
    destroy: () => {
      renderer.remove(mesh);
    },
  };
};

const rectGeometry = new PlaneGeometry(1, 1);

export const rect: ShapeDef<ShapeProps> = (hap, renderer) => {
  let { color } = { ...circleDefaults, ...hap.value };

  let mesh = new Mesh(
    rectGeometry,
    new MeshBasicMaterial({ color: new Color(color) })
  );

  renderer.add(mesh);

  return {
    update: (time, controls) => {
      let { x, y, radius, wide, tall, rotation } = {
        ...circleDefaults,
        ...controls,
      };
      mesh.scale.set(wide ?? 2 * radius ?? 1, tall ?? 2 * radius ?? 1, 1);
      let scaled = renderer.getPositionInView(x, y);
      mesh.position.set(scaled.x, scaled.y, 0);
      mesh.rotation.set(0, 0, (rotation ?? 0) * -2 * Math.PI);
    },
    destroy: () => {
      renderer.remove(mesh);
    },
  };
};
