import * as THREE from 'three';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import Sphere from './scene/sphere';
import Particles from './scene/particles';
import Audio from './utils/audio';
import { getDimensions } from './utils';
import Program from './program';

const WIDTH_MOBILE = 768;

const Pulse = function() {
 
    const program = new Program();

    const { width  } = getDimensions('webGL-wrapper');
    const isMobile = width < WIDTH_MOBILE;

    this.audio = new Audio();
    const sphere = new Sphere();
    const particles = new Particles();

    program.setUp(
        ({camera, renderer}) => {            
            camera.position.set(0,0, isMobile ? 40 : 20);

            renderer.setClearColor(new THREE.Color('#010101'), 1.);

            const light = new THREE.DirectionalLight(0xffffff, 1);
            light.position.z = 10;
            light.position.y = 10;
            light.position.x = 10;
            light.lookAt(new THREE.Vector3(0,0,0))
            program.addToScene([light])
            
            renderer.shadowMap.enabled = true;
            renderer.toneMapping = THREE.ReinhardToneMapping;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }
    )

    program.setUpComposer(
        ({composer, size}) => {
            const bloomPass = new UnrealBloomPass(size, 1.2, .9, .8);
            composer.addPass(bloomPass);
            bloomPass.renderToScreen = true;
            const filmPass = new FilmPass(0.35,0.25, 648, false);
            composer.addPass(filmPass); 
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