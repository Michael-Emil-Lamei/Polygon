import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 5, 15);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('pyramid').appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}
animate();

const khufuGeomertry = new THREE.ConeGeometry(4,5,4)
const khufuMaterial = new THREE.MeshStandardMaterial({color: 0xc2a878});
const khufu = new THREE.Mesh(khufuGeomertry, khufuMaterial);
khufu.position.set(0, 2.5, 0);
scene.add(khufu);

const khafreGeomertry = new THREE.ConeGeometry(3.7,4.65,4)
const khafreMaterial = new THREE.MeshStandardMaterial({color: 0xb89a72});
const khafre = new THREE.Mesh(khafreGeomertry, khafreMaterial);
khafre.position.set(-9, 2.325, 2);
scene.add(khafre);

const menkaureGeomertry = new THREE.ConeGeometry(3.7,4.65,4)
const menkaureMaterial = new THREE.MeshStandardMaterial({color: 0xaf8f66});
const menkaure = new THREE.Mesh(menkaureGeomertry, menkaureMaterial);
menkaure.position.set(-9, 2.325, 2);
scene.add(menkaure);

const ambientlight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientlight);

const sunlight = new THREE.Directedlight(0xfff2d9, 1.2);
sunlight.position.set(10, 15, 10);
scene.add(sunlight);
