var AUTO_ADD = true;

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
var sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
var tubeGeometry = new THREE.CylinderGeometry(0.03, 0.03, 2, 32);
var tubeMaterial = new THREE.MeshBasicMaterial({color: 0xaaaaaa});

// create the chain
var chain = new THREE.Object3D();
for (var i = 0; i < 30; i++) {
  chain.add(createBlock(-0.3 * i, 9 * i));
}
scene.add(chain);

// animate
var animate = function (time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
  chain.rotation.y += 0.01;
  renderer.render(scene, camera);
};
animate();
animateNewBlock();

document.onkeypress = function (e) {
  AUTO_ADD = false;
  animateNewBlock();
};

function animateNewBlock() {
  var added = createBlock(0.3, -9);
  chain.add(added);
  moveAllDownOne().onComplete(function() {
    // reset
    chain.position.y = 0;
    chain.rotation.y -= 9 * Math.PI/180;
    chain.remove(added);
    if (AUTO_ADD) setTimeout(function() {
      animateNewBlock();
    }, 1000);
  });
}

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

function moveAllDownOne() {
  var coords = { y: 0 };
  var tween = new TWEEN.Tween(coords)
    .to({ y: -0.3 }, 400)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(function() {
      chain.position.y = coords.y;
    }).start();
  return tween;
}