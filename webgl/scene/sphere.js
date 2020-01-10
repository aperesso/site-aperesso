import * as THREE from "three";
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { fragmentShader, vertexShader } from '../shaders/sphere';
import { SPHERE_SETTINGS  } from '../utils/settings';

const Sphere = function() {

  const uniforms = {
    uAudioBandsBuffer : { value : new Array(8).fill(0) },
    uNoiseScale : { value : SPHERE_SETTINGS.noiseScale },
    uNoiseFrequency : { value : SPHERE_SETTINGS.noiseFrequency },
    uNoiseOffset : { value : SPHERE_SETTINGS.noiseOffset },
    uTime : { value : 1.0 },
    uMaterialAmbientA : { value : new THREE.Color(SPHERE_SETTINGS.materialAmbientA)},
    uMaterialAmbientB : { value : new THREE.Color(SPHERE_SETTINGS.materialAmbientB)},
    uMaterialSpecularA : { value : new THREE.Color(SPHERE_SETTINGS.materialSpecularA) },
    uMaterialSpecularB : { value : new THREE.Color(SPHERE_SETTINGS.materialSpecularB) },
    uMaterialDiffuseA : { value : new THREE.Color(SPHERE_SETTINGS.materialDiffuseA)},
    uMaterialDiffuseB : { value : new THREE.Color(SPHERE_SETTINGS.materialDiffuseB)},
    uMaterialShininess : { value : SPHERE_SETTINGS.materialShininess },
    uLightAmbient : { value : new THREE.Color(SPHERE_SETTINGS.lightAmbient) },
    uLightDiffuse : { value : new THREE.Color(SPHERE_SETTINGS.lightDiffuse) },
    uLightSpecular : { value : new THREE.Color(SPHERE_SETTINGS.lightSpecular) },
    uLightPosition : { value : SPHERE_SETTINGS.lightPosition }
  }
  
  this.setUp = async (audio, isMobile) => {
    this.audio = audio;
    const segments = isMobile ? 100 : SPHERE_SETTINGS.segments;
    const geometry = new THREE.SphereBufferGeometry(SPHERE_SETTINGS.radius, segments, segments);
    BufferGeometryUtils.computeTangents(geometry);
    const material = new THREE.ShaderMaterial({
      uniforms,
      fragmentShader,
      vertexShader
    });
    this.mesh = new THREE.Mesh(geometry, material);
  }

  this.update = () => {
    this.mesh.material.uniforms["uTime"].value += 0.001;
    this.mesh.material.uniforms["uNoiseOffset"].value.x += 0.02;
    this.mesh.material.uniforms["uNoiseOffset"].value.y += 0.02;
    this.mesh.material.uniforms["uNoiseOffset"].value.z += 0.02;
    this.mesh.material.uniforms["uAudioBandsBuffer"].value = this.audio.getAudioBandsBuffer();    
  }
}

export default Sphere;