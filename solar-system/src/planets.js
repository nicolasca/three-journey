import * as THREE from "three";

const SOLAR_SYSTEM_UNIT = 10;
const SOLAR_SYSTEM_SIZE = 228;

/**
 * Textures loader
 */
const textureLoader = new THREE.TextureLoader();
const clayRoughTexture = textureLoader.load("/clay/textures/rough.jpg");
const clayHeightTexture = textureLoader.load("/clay/textures/height.jpg");

const meshPlanets = [];
const ellipses = [];

const planetProperties = [
  {
    name: "Mercure",
    size: 0.2,
    widthSegments: 32,
    heightSegments: 32,
    color: 0x5c5c5c,
    ellipseTime: 1,
    distance: 58,
  },
  {
    name: "Venus",
    size: 0.45,
    widthSegments: 32,
    heightSegments: 32,
    color: 0xbd7b21,
    ellipseTime: 2.57,
    distance: 108,
  },
  {
    name: "Earth",
    size: 0.5,
    widthSegments: 128,
    heightSegments: 128,
    color: 0x2274cc,
    ellipseTime: 4.2,
    distance: 150,
  },
  {
    name: "Mars",
    size: 0.25,
    widthSegments: 32,
    heightSegments: 32,
    color: 0x802312,
    ellipseTime: 7.9,
    distance: 228,
  },
  {
    name: "Jupiter",
    size: 5.5,
    widthSegments: 32,
    heightSegments: 32,
    color: 0x802312,
    ellipseTime: 7.9,
    distance: 778,
  },
  {
    name: "Saturne",
    size: 5,
    widthSegments: 32,
    heightSegments: 32,
    color: 0x802312,
    ellipseTime: 7.9,
    distance: 1433,
  },
  {
    name: "Uranus",
    size: 2,
    widthSegments: 32,
    heightSegments: 32,
    color: "red",
    ellipseTime: 7.9,
    distance: 2872,
  },
  {
    name: "Neptune",
    size: 2,
    widthSegments: 32,
    heightSegments: 32,
    color: 0x802312,
    ellipseTime: 7.9,
    distance: 4500,
  },
];

function createPlanet(radius, widthSegments, heightSegments, color) {
  const material = new THREE.MeshStandardMaterial({ color });
  material.map = clayRoughTexture;
  material.displacementMap = clayHeightTexture;
  material.displacementScale = 10;
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, widthSegments, heightSegments),
    material
  );
}

function createEllipse(radius, outerRadius, segments) {
  return new THREE.Mesh(
    new THREE.RingGeometry(radius, outerRadius, segments),
    new THREE.LineBasicMaterial({ color: 0x999999, side: THREE.DoubleSide })
  );
}

planetProperties.forEach((planet) => {
  // Add planet
  const mesh = createPlanet(
    planet.size,
    planet.widthSegments,
    planet.heightSegments,
    planet.color
  );
  const distance = (planet.distance / SOLAR_SYSTEM_SIZE) * SOLAR_SYSTEM_UNIT;
  mesh.distance = distance;
  mesh.time = planet.ellipseTime;

  meshPlanets.push(mesh);

  // Add ellipse
  const ellipse = createEllipse(distance, distance + 0.03, 72);
  ellipses.push(ellipse);
});

export { meshPlanets, ellipses };
