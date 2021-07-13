import "./style.css";
import * as THREE from "three";
import { Vector3 } from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const createCube = (size, color) => {
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshBasicMaterial({ color: color });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

/**
 * Objects
 */

const group = new THREE.Group();
const cube1 = createCube(1, "coral");
const cube2 = createCube(0.7, "blue");
const cube3 = createCube(1.3, "yellow");

// Position
cube1.position.x = -1.5;
cube2.position.x = 0;
cube3.position.x = 1.5;

// Scale

// Rotation
cube1.rotation.x = Math.PI * 0.25;
cube1.rotation.y = Math.PI * 0.25;
cube2.rotation.x = Math.PI * 0.25;
cube2.rotation.y = Math.PI * -0.25;
cube3.rotation.x = 0.7;
cube3.rotation.y = 0.7;

group.add(cube1);
group.add(cube2);
group.add(cube3);

scene.add(group);

// Axes helper
const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
