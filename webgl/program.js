import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

import { CAMERA_SETTINGS } from './utils/settings';
import { getDimensions } from './utils';

const Program = function() {

    const canvas = document.getElementById('webGL');
    const { width, height } = getDimensions('webGL-wrapper');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CAMERA_SETTINGS.fov, width / height, CAMERA_SETTINGS.near, CAMERA_SETTINGS.far);
    const renderer = new THREE.WebGLRenderer({ canvas  , antialias : true });
    const composer = new EffectComposer(renderer);
    const controls = new FirstPersonControls(camera, renderer.domElement);

    this.useComposer = false;
    this.useControls = false;

    renderer.setSize(width, height);
    renderer.gammaFactor = 2.2;
    
    this.setUp = setUp => setUp({camera, renderer})
    
    this.setUpComposer = setUpComposer => {
        this.useComposer = true;
        const renderScene = new RenderPass(scene, camera);
        composer.setSize(width, height);       
        composer.addPass(renderScene);
        setUpComposer({composer, size : new THREE.Vector2(width, height)});
    }

    this.setUpControls = setUpControls => {
        this.useControls = true;
        setUpControls(controls);
    }

    this.addToScene = meshes => meshes.forEach(mesh => scene.add(mesh))
    
    const clock = new THREE.Clock();

    this.update = update => {
        renderer.setAnimationLoop(
            () => {
                if (update) update();
                if (this.useControls) controls.update(clock.getDelta());
                if (this.useComposer) composer.render();
                else renderer.render(scene, camera);
            }
        )
    }

    this.onResize = onResize => {
        
        const { width , height } = getDimensions('webGL-wrapper');
        if (onResize) onResize();

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        if (this.useControls) controls.handleResize();
        if (this.useComposer) composer.setSize(width, height);
        renderer.setSize(width, height)
    
    }

    
}

export default Program;