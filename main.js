import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

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

const menkaureGeomertry = new THREE.ConeGeometry(1.8,2.25,4)
const menkaureMaterial = new THREE.MeshStandardMaterial({color: 0xaf8f66});
const menkaure = new THREE.Mesh(menkaureGeomertry, menkaureMaterial);
menkaure.position.set(8, 1.125, -1);
scene.add(menkaure);

const ambientlight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientlight);

const sunlight = new THREE.DirectionalLight(0xfff2d9, 1.2);
sunlight.position.set(10, 15, 10);
scene.add(sunlight);

const textureloader = new THREE.TextureLoader();
const sandtexture = textureloader.load("sandy_gravel_02_diff_4k.jpg");
sandtexture.wrapS = THREE.RepeatWrapping;
sandtexture.wrapT = THREE.RepeatWrapping;
sandtexture.repeat.set(10, 10);

const groundgeometry = new THREE.PlaneGeometry(60, 60);
const groundmaterial = new THREE.MeshStandardMaterial({ map: sandtexture });
const ground = new THREE.Mesh(groundgeometry, groundmaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;
control.dampingFactor = 0.05;
control.minDistance = 5;
control.maxDistance = 40;
control.maxPolarAngle = Math.PI / 2 - 0.05;

khufu.name = 'Khufu';
khufu.userData = {
    title: 'The Great Pyramid of Khufu',
    text: 'The biggest pyramid of the pyramids of Giza. Cosidered one of the ancient wonders of the world, the great pyramid of khufu was the tallest building in the world for around 3800 years.'
};

khafre.name = 'Khafre';
khafre.userData = {
    title: 'The Pyramid of Khafre',
    text: 'Although it is the middle-sized pyramid among the three pyramids of Giza, the pyramid of Khafre usually appears as the biggest/heighest of the three pyramids from a distance.'
};

menkaure.name = "Menkaure";
menkaure.userData = {
    title: 'The Pyramid of Menkaure',
    text: 'The smallest of the pyramids of giza, the pyramid of Menkaure is was built by king Menkoure (the grandson of king Khufu, the owner of the great pyramid'
};

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const clickablePyramids = [khufu, khafre, menkaure];

window.addEventListener('click', (event) => {
mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
raycaster.setFromCamera(mouse, camera);
const intersects = raycaster.intersectObjects(clickablePyramids);

if (intersects.length > 0) {
    const clicked = intersects[0].object;
    showInfoPanel(clicked.userData);
}

});

const infoPanel = document.getElementById('info');
const infoTitle = document.getElementById('info-title');
const infoText = document.getElementById('info-text');
const closeBtn = document.getElementById('close-btn');

function showInfoPanel(data) {
    infoTitle.textContent = data.title;
    infoText.textContent = data.text;
    infoPanel.classList.remove('hidden');

}

closeBtn.addEventListener('click', () => {
    infoPanel.classList.add('hidden');
});


const bgMusic = new Audio('ancient-egypt-music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.5;

let musicStarted = false;
function startMusic() {
    if (!musicStarted) {
        bgMusic.play();
        musicStarted = true;
    }
}

window.addEventListener('click', startMusic, {once: true});


function createSkyTexture() {
const canvas = document.createElement('canvas');
canvas.width = 2;
canvas.height = 512;
const ctx = canvas.getContext('2d');

const gradient = ctx.createLinearGradient(0, 0, 0, 512);
gradient.addColorStop(0, '#1b3a6b');
gradient.addColorStop(0.5, '#e8935f');
gradient.addColorStop(1, '#f4c98a');

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 2, 512);

return new THREE.CanvasTexture(canvas);
}

const skyGeometry = new THREE.SphereGeometry(200, 32, 32);
const skyMaterial = new THREE.MeshBasicMaterial({
    map: createSkyTexture(),
    side: THREE.BackSide
});

const sky = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(sky);




function animate() {
    requestAnimationFrame(animate);
    control.update();
    renderer.render(scene, camera);

}
animate();