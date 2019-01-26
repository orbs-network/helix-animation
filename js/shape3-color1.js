// setup the scene
var scene = new THREE.Scene();
var light = new THREE.AmbientLight(0x202020);
scene.add(light);
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);
directionalLight.position.set(0.3, 0.3, 1);
scene.fog = new THREE.Fog(0x000000, 48, 53);
var camera = new THREE.PerspectiveCamera(10, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.y = -1.5;
camera.position.z = 50;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// prepare the object templates
var sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00});
var tubeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
var tubeMaterial = new THREE.MeshLambertMaterial({color: 0xaaaaaa});

// create the chain
var chain = new THREE.Object3D();
for (var i = 0; i < 30; i++) {
  chain.add(createBlock(-0.3 * i, 12 * i));
}
scene.add(chain);

// animate
var animate = function () {
  requestAnimationFrame(animate);
  chain.rotation.y += 0.01;
  renderer.render(scene, camera);
};
animate();

function createBlock(height, angle) {
  var sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
  var sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
  var connector = new THREE.Mesh(tubeGeometry, tubeMaterial);
  connector.rotation.z = Math.PI/2;
  sphere1.position.x = 1;
  sphere2.position.x = -1;
  var block = new THREE.Object3D();
  block.add(connector);
  block.add(sphere1);
  block.add(sphere2);
  block.position.y = height;
  block.rotation.y = angle * Math.PI/180;
  return block;
}