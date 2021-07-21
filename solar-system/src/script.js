import * as THREE from "three";
import * as dat from "dat.gui";
import { meshPlanets, ellipses } from "./planets";

// const OrbitControls = require("three-orbit-controls")(THREE);
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
const geometry = new THREE.SphereGeometry(3, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial({ color: "yellow" });
sunMaterial.metalness = 0;
sunMaterial.roughness = 0.2;
const sun = new THREE.Mesh(geometry, sunMaterial);
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
folderSun.add(sunMaterial, "metalness", 0, 1, 0.001);
folderSun.add(sunMaterial, "roughness", 0, 1, 0.001);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 0;
pointLight.position.y = 0;
pointLight.position.z = 0;
scene.add(pointLight);

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
camera.position.z = 10;
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
