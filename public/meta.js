import * as THREE from 'three'


const scene = new THREE.Scene()
// scene.add(new THREE.AxesHelper(5))
scene.background = new THREE.Color('#0B0028');
// scene.background = new THREE.Color('#2E012A');

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z =25;
camera.position.x = 0;
camera.position.y = 50;
camera.lookAt(new THREE.Vector3(0, 0, 0));
// const gui = new GUI()
var pivot = new THREE.Object3D();


scene.add(pivot)
// const stats = Stats()
// document.body.appendChild(stats.dom)


	var particleMat = new THREE.PointsMaterial({
		color: 'rgb(255, 255, 255)',
		size: 0.2,
		map: new THREE.TextureLoader().load('./particle.jpg'),
		transparent: true,
		blending: THREE.AdditiveBlending,
		depthWrite: false,
		sizeAttenuation:true
	});
	
	var particleGeo = new THREE.SphereGeometry(15,32,32);
	var pG = new THREE.BufferGeometry;
	const pcnt = 1000;
	const posArray = new Float32Array(pcnt*3);

	for(let i = 0;i<pcnt*3;i++){
		posArray[i] = (Math.random() - 0.5) * 80;
	}
	pG.setAttribute('position',new THREE.BufferAttribute(posArray,3));

	var particleMesh = new THREE.Points(pG,particleMat);
	var particleSystem = new THREE.Points(
		particleGeo,
		particleMat
	);
	
	particleSystem.name = 'particleSystem';
	const positions = particleGeo.attributes.position.array
	// console.log(particleGeo.attributes.position.array)
	
	let x, y, z, index;
	x = y = z = index = 0;

for ( let i = 0, l = 5000; i < l; i ++ ) {
	x = positions[index+1];
	y = positions[index+2];
	z = positions[index+3];
    x += ( Math.random() - 0.5 )*2 ;
    y += ( Math.random() - 0.5 )*2 ;
    z += ( Math.random() - 0.5 )*2 ;
	positions[ index +1 ] = x;
    positions[ index +2 ] = y;
    positions[ index +3 ] = z;
	index+=3
}
	

	particleSystem.geometry.verticesNeedUpdate = true;
	scene.add(particleSystem,particleMesh);




const canvas = document.getElementById('bg');
// canvas.style.zIndex = -1
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)
renderer.render(scene,camera);
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true
// controls.enablePan=false
// controls.enableZoom=false
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

//mouse movement
document.addEventListener('mousemove',animateParticles);
let mouseX = 0
let mouseY = 0

function animateParticles(event){
	mouseY = event.clientY
	mouseX = event.clientX
}

const Clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate)
	const elapsedTime = Clock.getElapsedTime()
	particleSystem.rotation.y = 0.09 * elapsedTime;
	particleSystem.rotation.x =0.02 * elapsedTime;

	particleMesh.rotation.y -= 0.0001 * elapsedTime;

	if(mouseX >0){
		particleMesh.rotation.x = -mouseY * (elapsedTime*0.00008);
		particleMesh.rotation.y = -mouseX * (elapsedTime*0.00008);
		// particleSystem.rotation.y = -mouseX * (elapsedTime*0.00008)
	}
	gsap.to(camera.position, {
		duration: 8,
		y: 30,
		z:15,
		ease: 'circ.out',
		repeat: -1,
		yoyo: true,
	});
	// let flg = 0;
	// while(camera.position.z >= 15 && flg == 0){
	// 	camera.position.z -= 0.01;
	// 	camera.position.y -= 0.01
	// }
	
	// if(camera.position.z == 15)flg = 1;
	// if(camera.position.z<=30 && flg ==1){
	// 	camera.position.z += 0.01;
	// 	camera.position.y += 0.01
	// }
	// if(camera.position.z == 30)flg = 0;
	
    render()
	// stats.update()

}

function render() {
    renderer.render(scene, camera)
}

animate()



