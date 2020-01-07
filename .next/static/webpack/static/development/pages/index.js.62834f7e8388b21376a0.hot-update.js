webpackHotUpdate("static/development/pages/index.js",{

/***/ "./webgl/scene/particles.js":
/*!**********************************!*\
  !*** ./webgl/scene/particles.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./webgl/utils/index.js");
/* harmony import */ var _shaders_particles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shaders/particles */ "./webgl/shaders/particles.js");





var Particles = function Particles() {
  var _this = this;

  var particlesCount = 1000;
  var plane = new three__WEBPACK_IMPORTED_MODULE_1__["PlaneBufferGeometry"](10, 10);
  var geo = new three__WEBPACK_IMPORTED_MODULE_1__["InstancedBufferGeometry"]();
  geo.index = plane.index;
  geo.attributes = plane.attributes;
  var translate = new Float32Array(particlesCount * 3);
  var longitude = new Float32Array(particlesCount);
  var indice = new Float32Array(particlesCount);

  for (var i = 0, i3 = 0; i < particlesCount; i++, i3 += 3) {
    translate[i3 + 0] = Math.random() * 100 - 50;
    translate[i3 + 1] = Math.random() * 100 - 50;
    translate[i3 + 2] = -Math.random(30) - 10;
    longitude[i] = Math.random() * Math.PI;
    indice[i] = i % 8;
  }

  geo.setAttribute('translate', new three__WEBPACK_IMPORTED_MODULE_1__["InstancedBufferAttribute"](translate, 3));
  geo.setAttribute('longitude', new three__WEBPACK_IMPORTED_MODULE_1__["InstancedBufferAttribute"](longitude, 1));
  geo.setAttribute('indice', new three__WEBPACK_IMPORTED_MODULE_1__["InstancedBufferAttribute"](indice, 1));

  this.setUp = function _callee(audio) {
    var texture, material;
    return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _this.audio = audio;
            _context.next = 3;
            return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["loadTexture"])('smoke.png'));

          case 3:
            texture = _context.sent;
            material = new three__WEBPACK_IMPORTED_MODULE_1__["RawShaderMaterial"]({
              uniforms: {
                opacity: {
                  value: 0.1
                },
                texture: {
                  value: texture
                },
                time: {
                  value: 0.0
                },
                uAudioBandsBuffer: {
                  value: new Array(8).fill(null)
                }
              },
              vertexShader: _shaders_particles__WEBPACK_IMPORTED_MODULE_3__["vertexShader"],
              fragmentShader: _shaders_particles__WEBPACK_IMPORTED_MODULE_3__["fragmentShader"]
            });
            material.transparent = true;
            material.depthWrite = false;
            material.blending = three__WEBPACK_IMPORTED_MODULE_1__["AdditiveBlending"];
            material.side = three__WEBPACK_IMPORTED_MODULE_1__["DoubleSide"];
            _this.points = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](geo, material);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  this.update = function () {
    _this.points.material.uniforms["time"].value += 0.01;
    _this.points.material.uniforms["uAudioBandsBuffer"].value = _this.audio.getAudioBandsBuffer();
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Particles);

/***/ })

})
//# sourceMappingURL=index.js.62834f7e8388b21376a0.hot-update.js.map