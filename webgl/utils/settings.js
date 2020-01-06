import * as THREE from 'three';

const CAMERA_SETTINGS = {
  fov : 75,
  near : 0.1,
  far : 100,
}

const AUDIO_SETTINGS = {
  volume : 1,
  file : 'ghost.mp3',
  ftSize :  1024
}
const SPHERE_SETTINGS = {
  radius : 8,
  segments : 800,
  noiseScale : 3.1,
  noiseFrequency : 0.12,
  noiseOffset : new THREE.Vector3(0.2, 0.2, 0.2),
  materialAmbientA : "#070707",
  materialAmbientB : "#070707",
  materialSpecularA : "#593232",
  materialSpecularB : "#593232",
  materialDiffuseA : "#303030",
  materialDiffuseB : "#9d9d9d",
  materialShininess : 64,
  lightAmbient : '#2d2d2d',
  lightDiffuse : '#323232',
  lightSpecular : '#ffffff',
  lightPosition : new THREE.Vector3(3, 12, 20)
}

const GUI_SPHERE_SETTINGS = {
  noise : {
    noiseScale : {
      type : 'range',
      range : [0, 20]
    },
    noiseFrequency : {
      type : 'range',
      range : [0, 1],
    },
  },
  material : {
    materialShininess : {
      type : 'range',
      range : [16, 64]
    },
    materialAmbientA : {
      type : 'color'
    },
    materialAmbientB : {
      type : 'color'
    },
    materialDiffuseA : {
      type : 'color'
    },
    materialDiffuseB : {
      type : 'color'
    },
    materialSpecularA : {
      type : 'color'
    },
    materialSpecularB : {
      type : 'color'
    },
    lightAmbient : {
      type : 'color'
    },
    lightSpecular: {
      type : 'color'
    },
    lightDiffuse : {
      type : 'color'
    },
    lightPosition : {
      type : 'vector3',
      range: [-100,100]
    }
  },
}

export {
  CAMERA_SETTINGS,
  AUDIO_SETTINGS,
  SPHERE_SETTINGS,
  GUI_SPHERE_SETTINGS,
}