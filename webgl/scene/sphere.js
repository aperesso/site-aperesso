import * as THREE from "three";
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { fragmentShader, vertexShader } from '../shaders/sphere';
import noiseShader from '../shaders/noise';
import { SPHERE_SETTINGS  } from '../utils/settings';
import { loadTexture } from '../utils';

const Sphere = function() {

  this.materialShader = false; 
  
  this.setUp = async (audio, isMobile) => {
    this.audio = audio;
    const segments = isMobile ? 100 : SPHERE_SETTINGS.segments;

    const geometry = new THREE.SphereBufferGeometry(SPHERE_SETTINGS.radius, segments, segments);
    BufferGeometryUtils.computeTangents(geometry);

    const textures = [
      'envmap.jpg', 
      'metal/Metal03_col.jpg',
      'metal/Metal03_disp.jpg',
      'metal/Metal03_met.jpg',
      'metal/Metal03_nrm.jpg',
      'metal/Metal03_rgh.jpg'
    ].map(loadTexture);
    
    const [
      envMap,
      map, 
      displacementMap, 
      metalnessMap, 
      normalMap, 
      roughnessMap 
    ] = await Promise.all(textures);


    const st = new THREE.MeshStandardMaterial({
      envMap,
      map,
      displacementMap,
      metalnessMap,
      normalMap,
      roughnessMap,
    });

    st.onBeforeCompile = shader => {
      
      shader.uniforms.uTime = { value : 0 }
      shader.uniforms.uAudioBandsBuffer = { value : new Array(8).fill(0) } 
      shader.uniforms.uNoiseOffset = { value : new THREE.Vector3(0.2, 0.2, 0.2) }

      shader.vertexShader = `
        ${noiseShader}
        uniform float uTime;
        uniform float uAudioBandsBuffer[8];
        uniform vec3 uNoiseOffset;
        attribute vec3 tangent;

        varying float averageAudio;
        ${shader.vertexShader}
      `.replace(
        "#include <begin_vertex>", 
        vertexShader
      )

      shader.fragmentShader = `
        uniform float uTime;
        varying float averageAudio;
        ${shader.fragmentShader}
      `.replace(
          'vec4 diffuseColor = vec4( diffuse, opacity );',
          fragmentShader
      )

      this.materialShader = shader;
    }

    this.mesh = new THREE.Mesh(geometry, st);
  }

  this.update = () => {
    if (!this.materialShader) return;
    this.materialShader.uniforms["uTime"].value += 0.1;
    this.materialShader.uniforms["uAudioBandsBuffer"].value = this.audio.getAudioBandsBuffer();
    this.materialShader.uniforms["uNoiseOffset"].value.x += 0.02;
    this.materialShader.uniforms["uNoiseOffset"].value.y += 0.02;
    this.materialShader.uniforms["uNoiseOffset"].value.z += 0.02;
  }
}

export default Sphere;