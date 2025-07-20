console.log("Hello world");

import { WebGLRenderer, Scene, Camera } from "three";

// For now, do this all globally
const context = getDrawContext("animation-canvas", { contextType: "webgl2" });

const renderer = new WebGLRenderer({ context });
const scene = new Scene();
const camera = new Camera();

renderer.setClearColor(0xff00ff);
renderer.render(scene, camera);
