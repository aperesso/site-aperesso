import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.js';

import { CAMERA_SETTINGS } from './utils/settings';
import Audio from './utils/audio';
import { getDimensions } from './utils';

import Sphere from './scene/sphere';
import Particles from './scene/particles';

const WIDTH_MOBILE = 768;


const WebGL = function() {
  const canvas = document.getElementById('webGL');
  const { width , height } = getDimensions('webGL-wrapper');

  const isMobile = width < WIDTH_MOBILE;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(CAMERA_SETTINGS.fov, width / height, CAMERA_SETTINGS.near, CAMERA_SETTINGS.far);
  camera.position.set(0,0, isMobile ? 30 : 20);


  const renderer = new THREE.WebGLRenderer({ canvas , alpha: true });
  renderer.setSize(width, height);
  renderer.setClearColor(new THREE.Color('#010101'), 1.);
  renderer.shadowMap.enabled = true;
  renderer.gammaFactor = 2.2;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ReinhardToneMapping;


  const controls = new FirstPersonControls( camera, renderer.domElement );
  controls.lookAt(new THREE.Vector3(0,0,0));
  // controls.verticalMax = 0;
  controls.lookVertical = false;
  // controls.constrainVertical = true;

  const composer = new EffectComposer(renderer);
  composer.setSize(width, height);
  

  const renderScene = new RenderPass(scene, camera);
  composer.addPass(renderScene);

  const filmPass = new FilmPass(0.35,0.25, 648, false);
  composer.addPass(filmPass);

  this.loading = true;

  this.audio = new Audio();
  const sphere = new Sphere();
  const particles = new Particles();

  this.load = async () => {
    await this.audio.load();
    sphere.setUp(this.audio, isMobile);
    scene.add(sphere.mesh);
    await particles.setUp(this.audio);
    scene.add(particles.points);
    this.loading = false;
  }

  this.onResize = () => {
    const size = getDimensions('webGL-wrapper');
    camera.aspect = size.width /size.height;
    camera.updateProjectionMatrix();
    controls.handleResize();
    renderer.setSize( size.width, size.height );
    composer.setSize( size.width, size.height );
  }

  const clock = new THREE.Clock();


  this.render = () => {
    renderer.setAnimationLoop(
      () => {
        this.audio.update();
        sphere.update();
        particles.update();
        controls.update(clock.getDelta() )
        composer.render();
      }
    )
  }

}

export default WebGL;