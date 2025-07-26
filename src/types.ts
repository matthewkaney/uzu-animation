import type { Renderer } from "./renderer";

export interface Shape {
  update?: (time: number) => boolean | void;

  autoDestroy?: boolean;

  destroy: () => void;
}

export type ShapeDef<T extends Object> = (
  hap: Hap<T>,
  renderer: Renderer
) => Shape;

export interface Hap<T> {
  span: {
    begin: number;
    end: number;
  };
  value: T;
}
