webpackHotUpdate("static/development/pages/index.js",{

/***/ "./node_modules/three/examples/jsm/postprocessing/GlitchPass.js":
false,

/***/ "./node_modules/three/examples/jsm/shaders/DigitalGlitch.js":
false,

/***/ "./webgl/index.js":
/*!************************!*\
  !*** ./webgl/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/postprocessing/EffectComposer */ "./node_modules/three/examples/jsm/postprocessing/EffectComposer.js");
/* harmony import */ var three_examples_jsm_postprocessing_FilmPass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/postprocessing/FilmPass */ "./node_modules/three/examples/jsm/postprocessing/FilmPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/postprocessing/RenderPass */ "./node_modules/three/examples/jsm/postprocessing/RenderPass.js");
/* harmony import */ var _utils_settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/settings */ "./webgl/utils/settings.js");
/* harmony import */ var _utils_audio__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/audio */ "./webgl/utils/audio.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils */ "./webgl/utils/index.js");
/* harmony import */ var _scene_sphere__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./scene/sphere */ "./webgl/scene/sphere.js");
/* harmony import */ var _scene_particles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scene/particles */ "./webgl/scene/particles.js");











var WebGL = function WebGL() {
  var canvas = document.getElementById('webGL');

  var _getDimensions = Object(_utils__WEBPACK_IMPORTED_MODULE_7__["getDimensions"])('webGL'),
      width = _getDimensions.width,
      height = _getDimensions.height;

  var scene = new three__WEBPACK_IMPORTED_MODULE_1__["Scene"]();
  var camera = new three__WEBPACK_IMPORTED_MODULE_1__["PerspectiveCamera"](_utils_settings__WEBPACK_IMPORTED_MODULE_5__["CAMERA_SETTINGS"].fov, width / height, _utils_settings__WEBPACK_IMPORTED_MODULE_5__["CAMERA_SETTINGS"].near, _utils_settings__WEBPACK_IMPORTED_MODULE_5__["CAMERA_SETTINGS"].far);
  camera.position.set(0, 0, 20);
  var renderer = new three__WEBPACK_IMPORTED_MODULE_1__["WebGLRenderer"]({
    canvas: canvas,
    alpha: true
  });
  renderer.setSize(width, height);
  renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__["Color"]('#010101'), 1.);
  renderer.shadowMap.enabled = true;
  renderer.gammaFactor = 2.2;
  renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_1__["PCFSoftShadowMap"];
  renderer.toneMapping = three__WEBPACK_IMPORTED_MODULE_1__["ReinhardToneMapping"];
  var composer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__["EffectComposer"](renderer);
  composer.setSize(width, height);
  var renderScene = new three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_4__["RenderPass"](scene, camera);
  composer.addPass(renderScene);
  var filmPass = new three_examples_jsm_postprocessing_FilmPass__WEBPACK_IMPORTED_MODULE_3__["FilmPass"](0.35, 0.25, 648, false);
  composer.addPass(filmPass);
  var audio = new _utils_audio__WEBPACK_IMPORTED_MODULE_6__["default"]();
  var sphere = new _scene_sphere__WEBPACK_IMPORTED_MODULE_8__["default"]();
  var particles = new _scene_particles__WEBPACK_IMPORTED_MODULE_9__["default"]();

  this.load = function _callee() {
    return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(audio.load());

          case 2:
            sphere.setUp(audio);
            scene.add(sphere.mesh);
            _context.next = 6;
            return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(particles.setUp(audio));

          case 6:
            scene.add(particles.points);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  this.render = function () {
    renderer.setAnimationLoop(function () {
      audio.update();
      sphere.update();
      particles.update(); // renderer.render(scene, camera);

      composer.render();
    });
  };
};

/* harmony default export */ __webpack_exports__["default"] = (WebGL);

/***/ })

})
//# sourceMappingURL=index.js.f7d5649c98abbba32036.hot-update.js.map