import * as THREE from "three";
import * as dat from "dat.gui";
import { meshPlanets, ellipses } from "./planets";

const OrbitControls = require("three-orbit-controls")(THREE);

/**
 * Debug
 */
const gui = new dat.GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */

// Sun
const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: "yellow" });
const sun = new THREE.Mesh(geometry, material);
scene.add(sun);

//const folderEllipse = gui.addFolder("Ellipse");
//folderEllipse.add(geometryEllipse.parameters, "innerRadius");

//Planets
meshPlanets.forEach((planet) => {
  scene.add(planet);
});

ellipses.forEach((planet) => {
  scene.add(planet);
});

//const folderPlanet = gui.addFolder("Planet");

// Debug
// gui.add(sun, "radius").min(-5).max(5).step(0.01);
const folderSun = gui.addFolder("Sun");

folderSun.add(sun.geometry.parameters, "radius", 0.1, 5, 0.01);
folderSun.add(sun, "visible");

folderSun.add(material, "wireframe");

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 6;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Move planet
  meshPlanets.forEach((planet) => {
    const ellipseTime = elapsedTime / planet.time;
    planet.position.x = Math.cos(ellipseTime) * planet.distance;
    planet.position.y = Math.sin(ellipseTime) * planet.distance;
  });

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
