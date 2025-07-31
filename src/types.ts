import type { Renderer } from "./renderer";

export interface Shape<T extends Object> {
  update?: (time: number, controls: T) => boolean | void;

  autoDestroy?: boolean;

  destroy: () => void;
}

export type ShapeDef<T extends Object> = (
  hap: Hap<T>,
  renderer: Renderer
) => Shape<T>;

export interface Hap<T> {
  span: {
    begin: number;
    end: number;
  };
  value: T;
}
