import * as THREE from 'three'

import { loadTexture } from '../utils';
import { vertexShader, fragmentShader } from '../shaders/particles';


const Particles = function() {
  const particlesCount = 400;

  const plane = new THREE.PlaneBufferGeometry(10,10);
  const geo= new THREE.InstancedBufferGeometry();
  geo.index = plane.index;
  geo.attributes = plane.attributes;

  const translate = new Float32Array( particlesCount * 3 );
  const longitude = new Float32Array( particlesCount );
  const indice = new Float32Array( particlesCount );
  
  for ( let i = 0, i3 = 0; i < particlesCount; i ++, i3 += 3 ) {
      translate[ i3 + 0 ] = Math.random() * 100 - 50;
      translate[ i3 + 1 ] = Math.random() * 100 - 50;
      translate[ i3 + 2 ] = -Math.random(30) - 10;

      longitude[i] = Math.random() * Math.PI;
      indice[i] = i % 8;
  }

  geo.setAttribute( 'translate', new THREE.InstancedBufferAttribute( translate, 3 ) );
  geo.setAttribute( 'longitude', new THREE.InstancedBufferAttribute( longitude, 1 ) );
  geo.setAttribute( 'indice', new THREE.InstancedBufferAttribute( indice, 1 ) );



  this.setUp = async audio => {
    this.audio = audio;
    const texture = await loadTexture('smoke.png');
    const material = new THREE.RawShaderMaterial({
        uniforms : {
            opacity : { value : 0.1 },
            texture : { value : texture },
            time : { value : 0.0 },
            uAudioBandsBuffer : { value : new Array(8).fill(null)}
        },
        vertexShader,
        fragmentShader
    })
    material.transparent = true;
    material.depthWrite = false;
    material.blending = THREE.AdditiveBlending;
    material.side = THREE.DoubleSide;

    this.points = new THREE.Mesh(
        geo, 
        material,
    );
    
  }

  this.update = () => {
    this.points.material.uniforms["time"].value += 0.01;
    this.points.material.uniforms["uAudioBandsBuffer"].value = this.audio.getAudioBandsBuffer();
  }
}

export default Particles;