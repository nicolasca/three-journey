import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "dat.gui";

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

// Ellipse
const geometryEllipse = new THREE.RingGeometry(1, 1.01, 64);
const planetEllipse = new THREE.Mesh(
  geometryEllipse,
  new THREE.MeshBasicMaterial({ color: "white" })
);
scene.add(planetEllipse);
const folderEllipse = gui.addFolder("Ellipse");
folderEllipse.add(geometryEllipse.parameters, "innerRadius");
folderEllipse
  .add(geometryEllipse.parameters, "outerRadius")
  .min(0)
  .max(5)
  .step(0.01);

//Planet
const geometryPlanet = new THREE.SphereGeometry(0.1, 32, 32);
const materialPlanet = new THREE.MeshBasicMaterial({ color: "blue" });
const planet = new THREE.Mesh(geometryPlanet, materialPlanet);
scene.add(planet);
planet.position.x = 1;

const folderPlanet = gui.addFolder("Planet");

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
  100
);
camera.position.z = 3;
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

  // MOve planet
  planet.position.x = Math.cos(elapsedTime);
  planet.position.y = Math.sin(elapsedTime);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
