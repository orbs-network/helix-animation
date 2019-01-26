// setup the scene
var scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 46, 52);
var camera = new THREE.PerspectiveCamera(10, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.y = -1.5;
camera.position.z = 50;
scene.add(camera);
var renderer = new THREE.WebGLRenderer({antialias: false});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x000000), 1);
renderer.autoClear = false;
document.body.appendChild(renderer.domElement);

// effects
var renderModel = new THREE.RenderPass(scene, camera);
var effectBloom = new THREE.BloomPass(3.0);
var effectScreen = new THREE.ShaderPass(THREE.ShaderExtras["screen"]);
var effectHBlur = new THREE.ShaderPass(THREE.ShaderExtras["horizontalBlur"]);
effectHBlur.uniforms['h'].value = 1.2 / window.innerWidth;
var effectVBlur = new THREE.ShaderPass(THREE.ShaderExtras["verticalBlur"]);
effectVBlur.uniforms['v'].value = 1.2 / window.innerHeight;
effectScreen.renderToScreen = true;
var composer = new THREE.EffectComposer(renderer);
composer.addPass(renderModel);
composer.addPass(effectHBlur);
composer.addPass(effectVBlur);
composer.addPass(effectBloom);
composer.addPass(effectScreen);

// prepare the object templates
var sphereGeometry = new THREE.CubeGeometry(0.1, 0.4, 0.11);
var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
var tubeGeometry = new THREE.CubeGeometry(2, 0.4, 0.1);
var tubeMaterial = new THREE.MeshBasicMaterial({color: 0xaaaaaa});

// create the chain
var chain = new THREE.Object3D();
for (var i = 0; i < 30; i++) {
  chain.add(createBlock(-0.5 * i, 16 * i));
}
scene.add(chain);

// animate
var animate = function () {
  requestAnimationFrame(animate);
  chain.rotation.y += 0.01;
  renderer.clear();
  composer.render();
};
animate();

function createBlock(height, angle) {
  var sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
  var sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
  var connector = new THREE.Mesh(tubeGeometry, tubeMaterial);
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