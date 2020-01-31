import * as THREE from 'three';

const getDimensions = containerId => {
  const el = document.getElementById(containerId);
  const { width , height } = el.getBoundingClientRect();
  return { width , height };
}

const loadTexture = file => {
  const loader = new THREE.TextureLoader();
  const texture = new Promise((resolve, reject) => {
      loader.load(`/assets/texture/${file}`, texture => {
          resolve(texture)
      })
  })
  return texture;
}

export {
  getDimensions,
  loadTexture
}