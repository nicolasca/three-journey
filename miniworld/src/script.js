import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { MeshStandardMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Fog
const fog = new THREE.Fog("white", 50, 300);

// Scene
const scene = new THREE.Scene();
scene.fog = fog;
let mixer = null;

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(300, 300),
  new THREE.MeshPhongMaterial({
    color: 0x9199c0,
  })
);
floor.rotation.x = -Math.PI * 0.5;
const conf = { color: 0x9199c0 };
gui.addColor(conf, "color").onChange(function (colorValue) {
  floor.material.color.set(colorValue);
});
floor.receiveShadow = true;
scene.add(floor);

// Models
const loader = new GLTFLoader();
loader.load(
  "/models/tree.gltf",
  function (tree) {
    for (let i = 0; i < 100; i++) {
      const treeObj = tree.scene.clone();

      const angle = Math.random() * Math.PI * 2;
      const radius = 15 + Math.random() * 150;
      treeObj.position.x = Math.cos(angle) * radius;
      treeObj.position.z = Math.sin(angle) * radius;
      treeObj.position.y = 0.3;
      const maxSize = 0.5;
      const minSize = 0.1;
      const size = Math.random() * (maxSize - minSize + 1) + minSize;
      treeObj.scale.set(size, size, size);

      tree.scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.castShadow = obj.receiveShadow = true;
        }
      });
      scene.add(treeObj);
    }
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const maxSize = 0.7;
const minSize = 0.3;
const treesToKeep = ["bulb1", "snowy_pine1", "bulby3", "pine4", "Cube"];
loader.load(
  "/models/trees.glb",
  function (tree) {
    for (let i = 0; i < 10; i++) {
      const treeObj = tree.scene.clone();

      treeObj.position.x = 0.3;
      treeObj.position.z = 0.3;
      treeObj.position.y = 0;

      treeObj.children = treeObj.children.filter((obj) =>
        treesToKeep.includes(obj.name)
      );

      treeObj.traverse((obj) => {
        if (obj.isMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });

      treeObj.children.forEach((element) => {
        //Position
        const angle = Math.random() * Math.PI * 2;
        const radius = 15 + Math.random() * 100;
        element.position.x = Math.cos(angle) * radius;
        element.position.z = Math.sin(angle) * radius;

        // Size
        const size = Math.random() * (maxSize - minSize) + minSize;
        element.scale.set(size, size, size);
        scene.add(element);
      });
    }
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

loader.load(
  "/models/stonehedge.gltf",
  function (tree) {
    scene.add(tree.scene);
    tree.scene.position.set(4, 0.1, 1);
    tree.scene.scale.set(0.3, 0.3, 0.3);
    tree.scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.material.color.set(0xd7d7d7);
        obj.castShadow = obj.receiveShadow = true;
      }
    });
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

loader.load(
  "/models/druid.gltf",
  function (druid) {
    druid.scene.position.set(4, 0.1, 1);
    druid.scene.scale.set(1, 1, 1);

    mixer = new THREE.AnimationMixer(druid.scene);
    const action = mixer.clipAction(druid.animations[0]);
    action.play();
    druid.scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.material.color.set(0xd7d7d7);
        obj.castShadow = obj.receiveShadow = true;
      }
    });
    scene.add(druid.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

/**
 * Lights
 */

/* Lights */
const ambientLight = new THREE.AmbientLight("#ffffff", 0.2);
const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.8);
gui.add(hemisphereLight, "intensity").min(0).max(1).step(0.001);

scene.add(ambientLight);
scene.add(hemisphereLight);

const frontLight = new THREE.PointLight(0xff0000, 0.8, 100);
frontLight.position.set(0, 50, 0);
frontLight.castShadow = true;
gui.add(frontLight, "intensity").min(0).max(1).step(0.001);
gui.add(frontLight.position, "x").min(-20).max(20).step(0.001);
gui.add(frontLight.position, "y").min(-20).max(50).step(0.001);
gui.add(frontLight.position, "z").min(-20).max(20).step(0.001);
scene.add(frontLight);

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
  500
);
camera.position.x = 4;
camera.position.y = 50;
camera.position.z = 50;
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
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor("white");

// Shadows
renderer.shadowMap.enabled = true;

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Update controls
  controls.update();

  if (mixer) {
    mixer.update(deltaTime);
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
