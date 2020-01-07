import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

import { CAMERA_SETTINGS } from './utils/settings';
import Audio from './utils/audio';
import { getDimensions } from './utils';

import Sphere from './scene/sphere';
import Particles from './scene/particles';


const WebGL = function() {
  const canvas = document.getElementById('webGL');
  const { width , height } = getDimensions('webGL');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(CAMERA_SETTINGS.fov, width / height, CAMERA_SETTINGS.near, CAMERA_SETTINGS.far);
  camera.position.set(0,0,20);

  const renderer = new THREE.WebGLRenderer({ canvas , alpha: true });
  renderer.setSize(width, height);
  renderer.setClearColor(new THREE.Color('#010101'), 1.);
  renderer.shadowMap.enabled = true;
  renderer.gammaFactor = 2.2;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ReinhardToneMapping;

  const composer = new EffectComposer(renderer);
  composer.setSize(width, height);

  const renderScene = new RenderPass(scene, camera);
  composer.addPass(renderScene);


  const filmPass = new FilmPass(0.35,0.25, 648, false);
  composer.addPass(filmPass)

  const audio = new Audio();
  const sphere = new Sphere();
  const particles = new Particles();

  this.load = async () => {
    await audio.load();
    sphere.setUp(audio);
    scene.add(sphere.mesh);
    await particles.setUp(audio);
    scene.add(particles.points);
  }

  this.render = () => {
    renderer.setAnimationLoop(
      () => {
        audio.update();
        sphere.update();
        particles.update();
        composer.render();
      }
    )
  }
}

export default WebGL;