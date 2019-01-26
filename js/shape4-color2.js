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
var leftGeometry = new THREE.CubeGeometry(1, 0.4, 0.3);
var leftMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
var rightGeometry = new THREE.CubeGeometry(1, 0.4, 0.3);
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
  renderer.clear();
  composer.render();
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