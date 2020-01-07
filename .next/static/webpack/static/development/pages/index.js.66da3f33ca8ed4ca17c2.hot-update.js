webpackHotUpdate("static/development/pages/index.js",{

/***/ "./webgl/utils/settings.js":
/*!*********************************!*\
  !*** ./webgl/utils/settings.js ***!
  \*********************************/
/*! exports provided: CAMERA_SETTINGS, AUDIO_SETTINGS, SPHERE_SETTINGS, GUI_SPHERE_SETTINGS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CAMERA_SETTINGS", function() { return CAMERA_SETTINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUDIO_SETTINGS", function() { return AUDIO_SETTINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPHERE_SETTINGS", function() { return SPHERE_SETTINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GUI_SPHERE_SETTINGS", function() { return GUI_SPHERE_SETTINGS; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var CAMERA_SETTINGS = {
  fov: 75,
  near: 0.1,
  far: 100
};
var AUDIO_SETTINGS = {
  volume: 1,
  file: 'ghost.mp3',
  ftSize: 1024
};
var SPHERE_SETTINGS = {
  radius: 8,
  segments: 300,
  noiseScale: 1.0,
  noiseFrequency: 0.224,
  noiseOffset: new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0.2, 0.2, 0.2),
  materialAmbientA: "#070707",
  materialAmbientB: "#070707",
  materialSpecularA: "#353535",
  materialSpecularB: "#353535",
  materialDiffuseA: "#666666",
  materialDiffuseB: "#9d9d9d",
  materialShininess: 64,
  lightAmbient: '#2d2d2d',
  lightDiffuse: '#323232',
  lightSpecular: '#ffffff',
  lightPosition: new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](3, 12, 20)
};
var GUI_SPHERE_SETTINGS = {
  noise: {
    noiseScale: {
      type: 'range',
      range: [0, 20]
    },
    noiseFrequency: {
      type: 'range',
      range: [0, 1]
    }
  },
  material: {
    materialShininess: {
      type: 'range',
      range: [16, 64]
    },
    materialAmbientA: {
      type: 'color'
    },
    materialAmbientB: {
      type: 'color'
    },
    materialDiffuseA: {
      type: 'color'
    },
    materialDiffuseB: {
      type: 'color'
    },
    materialSpecularA: {
      type: 'color'
    },
    materialSpecularB: {
      type: 'color'
    },
    lightAmbient: {
      type: 'color'
    },
    lightSpecular: {
      type: 'color'
    },
    lightDiffuse: {
      type: 'color'
    },
    lightPosition: {
      type: 'vector3',
      range: [-100, 100]
    }
  }
};


/***/ })

})
//# sourceMappingURL=index.js.66da3f33ca8ed4ca17c2.hot-update.js.map