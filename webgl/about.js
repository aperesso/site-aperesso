import * as THREE from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import Program from './program';
import { loadTexture } from './utils';

const About = function() {
    const program = new Program();

    program.setUp(
        ({camera , renderer }) => {
            camera.position.set(0, 0, 2.5);
            camera.lookAt(new THREE.Vector3(0,0,0));
            renderer.outputEncoding = THREE.sRGBEncoding;
        }
    )

    const geo = new THREE.TorusBufferGeometry(2, 1.8, 50, 50);
    const mat = new THREE.MeshBasicMaterial({
        transparent: true
    });
    const torusA = new THREE.Mesh(geo, mat);
    const torusB = new THREE.Mesh(geo, mat);

    torusB.position.set(1.8, 0, 0);
    torusB.rotation.x -= Math.PI / 2;
  
    this.load = async () => {
        const texture =  await loadTexture('about.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 9, 59 );
        texture.encoding = THREE.sRGBEncoding;
        
        mat.map = texture;
        mat.needsUpdate = true;

        program.addToScene([torusA]);

    }

    program.setUpComposer(
        ({composer, size}) => {
            const bloomPass = new UnrealBloomPass(size, .7, .9, .8);
            composer.addPass(bloomPass);
        }
    )
    
    let t = 0 ;
    this.render = () => program.update(
        () => {
            t += 0.001;
            mat.map.offset.y += 0.05;
            torusA.rotation.x = + 0.1 + Math.cos(t) * .2
            torusA.rotation.y = Math.sin(t) * .4;
         
        }
    );


    this.onResize = () => program.onResize();
}

export default About;