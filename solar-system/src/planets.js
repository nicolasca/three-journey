import * as THREE from "three";

const SOLAR_SYSTEM_UNIT = 10;
const SOLAR_SYSTEM_SIZE = 228;

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
    widthSegments: 32,
    heightSegments: 32,
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
    color: 0x802312,
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
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, widthSegments, heightSegments),
    new THREE.MeshBasicMaterial({ color: color })
  );
}

function createEllipse(radius, outerRadius, segments) {
  return new THREE.Mesh(
    new THREE.RingGeometry(radius, outerRadius, segments),
    new THREE.LineBasicMaterial({ color: "white", side: THREE.DoubleSide })
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
