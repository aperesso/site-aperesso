import * as THREE from 'three';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';

import Sphere from './scene/sphere';
import Particles from './scene/particles';
import Audio from './utils/audio';
import { getDimensions } from './utils';
import Program from './program';

const WIDTH_MOBILE = 768;

const Pulse = function() {
 
    const program = new Program();

    const { width } = getDimensions('webGL-wrapper');
    const isMobile = width < WIDTH_MOBILE;

    this.audio = new Audio();
    const sphere = new Sphere();
    const particles = new Particles();

    program.setUp(
        ({camera, renderer}) => {            
            camera.position.set(0,0, isMobile ? 30 : 20);

            renderer.setClearColor(new THREE.Color('#010101'), 1.);

            const light = new THREE.DirectionalLight(0xffffff, 0.8);
            light.position.z = 5;
            
            program.addToScene([light])
            
            renderer.shadowMap.enabled = true;
            renderer.toneMapping = THREE.ReinhardToneMapping;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }
    )

    program.setUpComposer(
        ({composer}) => {
            // const filmPass = new FilmPass(0.35,0.25, 648, false);
            // composer.addPass(filmPass); 
        }
    )

    program.setUpControls(
        controls => {
            controls.lookAt(new THREE.Vector3(0,0,0));
            controls.lookVertical = false;
        }
    )
    
    this.load = async () => {
        await this.audio.load();
        await sphere.setUp(this.audio, this.mobile);
        await particles.setUp(this.audio);

        program.addToScene([
            sphere.mesh, 
            particles.points
        ])
    }

    this.render = () => program.update(
        () => {
            this.audio.update();
            sphere.update();
            particles.update();
        }
    )

    this.onResize = () => program.onResize()

}

export default Pulse;