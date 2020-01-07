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





var Particle = function Particle() {
  this.radius = Math.random() * 3 + 10.0;
  this.longitude = Math.random() * Math.PI;
  this.latitude = Math.random() * Math.PI * 2.0;
  this.speed = 0.001;
};

var Particles = function Particles() {
  var _this = this;

  var particlesCount = 500;
  var array = new Array(particlesCount).fill(null).map(function () {
    return new Particle();
  });
  var positions = new Array(particlesCount * 3).fill(0);
  var radius = array.map(function (particle) {
    return particle.radius;
  });
  var longitude = array.map(function (particle) {
    return particle.longitude;
  });
  var latitude = array.map(function (particle) {
    return particle.latitude;
  });
  var speed = array.map(function (particle) {
    return particle.speed;
  });
  var geometry = new three__WEBPACK_IMPORTED_MODULE_1__["BufferGeometry"]();
  geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_1__["Float32BufferAttribute"](positions, 3));
  geometry.setAttribute('radius', new three__WEBPACK_IMPORTED_MODULE_1__["Float32BufferAttribute"](radius, 1));
  geometry.setAttribute('longitude', new three__WEBPACK_IMPORTED_MODULE_1__["Float32BufferAttribute"](longitude, 1));
  geometry.setAttribute('latitude', new three__WEBPACK_IMPORTED_MODULE_1__["Float32BufferAttribute"](latitude, 1));
  geometry.setAttribute('speed', new three__WEBPACK_IMPORTED_MODULE_1__["Float32BufferAttribute"](speed, 1));

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
            material = new three__WEBPACK_IMPORTED_MODULE_1__["ShaderMaterial"]({
              uniforms: {
                uAudioBandsBuffer: {
                  value: new Array(8).fill(0)
                },
                pointTexture: {
                  value: texture
                },
                opacity: {
                  value: 0.1
                },
                time: {
                  value: 0.0
                }
              },
              vertexShader: _shaders_particles__WEBPACK_IMPORTED_MODULE_3__["vertexShader"],
              fragmentShader: _shaders_particles__WEBPACK_IMPORTED_MODULE_3__["fragmentShader"]
            });
            material.transparent = true;
            material.depthWrite = false;
            material.blending = three__WEBPACK_IMPORTED_MODULE_1__["AdditiveBlending"];
            _this.points = new three__WEBPACK_IMPORTED_MODULE_1__["Points"](geometry, material);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  this.update = function () {
    var longitudes = _this.points.geometry.attributes.longitude.array;
    var latitudes = _this.points.geometry.attributes.longitude.array;

    for (var i in longitudes) {
      longitudes[i] += array[i].speed;
      latitudes[i] += array[i].speed;
    }

    _this.points.geometry.attributes.longitude.needsUpdate = true;
    _this.points.geometry.attributes.latitude.needsUpdate = true;
    _this.points.material.uniforms["uAudioBandsBuffer"].value = _this.audio.getAudioBandsBuffer();
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Particles);

/***/ })

})
//# sourceMappingURL=index.js.78188e7eb1e42f58ed65.hot-update.js.map