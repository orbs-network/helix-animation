// setup the scene
var scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 46, 53);
var camera = new THREE.PerspectiveCamera(10, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.y = -1.5;
camera.position.z = 50;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// prepare the object templates
var leftGeometry = new THREE.BoxGeometry(1, 0.4, 0.3);
var leftMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
var rightGeometry = new THREE.BoxGeometry(1, 0.4, 0.3);
var rightMaterial = new THREE.MeshBasicMaterial({color: 0xaaaaaa});

// create the chain
var chain = new THREE.Object3D();
for (var i = 0; i < 30; i++) {
  chain.add(createBlock(-0.55 * i, 14 * i));
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
  var left = new THREE.Mesh(leftGeometry, leftMaterial);
  var right = new THREE.Mesh(rightGeometry, rightMaterial);
  left.position.x = 0.5;
  right.position.x = -0.5;
  var block = new THREE.Object3D();
  block.add(left);
  block.add(right);
  block.position.y = height;
  block.rotation.y = angle * Math.PI/180;
  return block;
}