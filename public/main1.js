import * as THREE from 'three'


const canvas = document.getElementById("Mybg")
canvas.style.zIndex = 4
const renderer = new THREE.WebGLRenderer({canvas,alpha:true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 0 ); // the default

const scene = new THREE.Scene();

// document.body.appendChild( renderer.domElement );


// geometry
const geometry = new THREE.SphereGeometry(16,16,16,16);


const particleGeometry = new THREE.BufferGeometry;
const particleCnt = 5000


const posArray = new Float32Array(particleCnt * 3);


for(let i = 0 ; i < particleCnt*3 ; i++)
{
  posArray[i] = (Math.random() - 0.5) * 2000;
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray,3));


// materials

const material = new THREE.PointsMaterial({
  size:0.65,
  color:0xffffff
})

// sphere
const particle = new THREE.Points(particleGeometry,material)
// particle.set.position(10,20,10)
particle.position.x = -100
// particle.position.z = 30
scene.add(particle)

const light = new THREE.PointLight(0xffffff,0.1);
light.position.set(2,3,4);


// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z =95;
camera.position.x = 0;
camera.position.y = 50;
camera.lookAt(new THREE.Vector3(0, 0, 0));


// controls
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true
// controls.enablePan=false
// controls.enableZoom=false
// controls.autoRotate = true
// controls.autoRotateSpeed = 200


scene.add(camera)
scene.add(light)
renderer.render(scene,camera);


const clock = new THREE.Clock();

const tick = () =>{

  const elapsedTime = clock.getElapsedTime()

  //update object
  // sphere.ro
  particle.rotation.x += .0005;

  renderer.render(scene,camera);

  window.requestAnimationFrame(tick)

}

tick();