webpackHotUpdate("static/development/pages/index.js",{

/***/ "./node_modules/three/examples/jsm/postprocessing/FilmPass.js":
/*!********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/postprocessing/FilmPass.js ***!
  \********************************************************************/
/*! exports provided: FilmPass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilmPass", function() { return FilmPass; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/create */ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../build/three.module.js */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../postprocessing/Pass.js */ "./node_modules/three/examples/jsm/postprocessing/Pass.js");
/* harmony import */ var _shaders_FilmShader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shaders/FilmShader.js */ "./node_modules/three/examples/jsm/shaders/FilmShader.js");



/**
 * @author alteredq / http://alteredqualia.com/
 */




var FilmPass = function FilmPass(noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale) {
  _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__["Pass"].call(this);
  if (_shaders_FilmShader_js__WEBPACK_IMPORTED_MODULE_4__["FilmShader"] === undefined) console.error("FilmPass relies on FilmShader");
  var shader = _shaders_FilmShader_js__WEBPACK_IMPORTED_MODULE_4__["FilmShader"];
  this.uniforms = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["UniformsUtils"].clone(shader.uniforms);
  this.material = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["ShaderMaterial"]({
    uniforms: this.uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader
  });
  if (grayscale !== undefined) this.uniforms.grayscale.value = grayscale;
  if (noiseIntensity !== undefined) this.uniforms.nIntensity.value = noiseIntensity;
  if (scanlinesIntensity !== undefined) this.uniforms.sIntensity.value = scanlinesIntensity;
  if (scanlinesCount !== undefined) this.uniforms.sCount.value = scanlinesCount;
  this.fsQuad = new _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__["Pass"].FullScreenQuad(this.material);
};

FilmPass.prototype = _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()(_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default()(_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__["Pass"].prototype), {
  constructor: FilmPass,
  render: function render(renderer, writeBuffer, readBuffer, deltaTime
  /*, maskActive */
  ) {
    this.uniforms["tDiffuse"].value = readBuffer.texture;
    this.uniforms["time"].value += deltaTime;

    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer);
      if (this.clear) renderer.clear();
      this.fsQuad.render(renderer);
    }
  }
});


/***/ }),

/***/ "./node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js":
false,

/***/ "./node_modules/three/examples/jsm/shaders/FilmShader.js":
/*!***************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/FilmShader.js ***!
  \***************************************************************/
/*! exports provided: FilmShader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilmShader", function() { return FilmShader; });
/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Film grain & scanlines shader
 *
 * - ported from HLSL to WebGL / GLSL
 * http://www.truevision3d.com/forums/showcase/staticnoise_colorblackwhite_scanline_shaders-t18698.0.html
 *
 * Screen Space Static Postprocessor
 *
 * Produces an analogue noise overlay similar to a film grain / TV static
 *
 * Original implementation and noise algorithm
 * Pat 'Hawthorne' Shearon
 *
 * Optimized scanlines + noise version with intensity scaling
 * Georg 'Leviathan' Steinrohder
 *
 * This version is provided under a Creative Commons Attribution 3.0 License
 * http://creativecommons.org/licenses/by/3.0/
 */
var FilmShader = {
  uniforms: {
    "tDiffuse": {
      value: null
    },
    "time": {
      value: 0.0
    },
    "nIntensity": {
      value: 0.5
    },
    "sIntensity": {
      value: 0.05
    },
    "sCount": {
      value: 4096
    },
    "grayscale": {
      value: 1
    }
  },
  vertexShader: ["varying vec2 vUv;", "void main() {", "	vUv = uv;", "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
  fragmentShader: ["#include <common>", // control parameter
  "uniform float time;", "uniform bool grayscale;", // noise effect intensity value (0 = no effect, 1 = full effect)
  "uniform float nIntensity;", // scanlines effect intensity value (0 = no effect, 1 = full effect)
  "uniform float sIntensity;", // scanlines effect count value (0 = no effect, 4096 = full effect)
  "uniform float sCount;", "uniform sampler2D tDiffuse;", "varying vec2 vUv;", "void main() {", // sample the source
  "	vec4 cTextureScreen = texture2D( tDiffuse, vUv );", // make some noise
  "	float dx = rand( vUv + time );", // add noise
  "	vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx, 0.0, 1.0 );", // get us a sine and cosine
  "	vec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );", // add scanlines
  "	cResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;", // interpolate between source and result by intensity
  "	cResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );", // convert to grayscale if desired
  "	if( grayscale ) {", "		cResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );", "	}", "	gl_FragColor =  vec4( cResult, cTextureScreen.a );", "}"].join("\n")
};


/***/ }),

/***/ "./node_modules/three/examples/jsm/shaders/LuminosityHighPassShader.js":
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
  var filmPass = new three_examples_jsm_postprocessing_FilmPass__WEBPACK_IMPORTED_MODULE_3__["FilmPass"](0.35, 0.025, 648, false);
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
//# sourceMappingURL=index.js.2351d3397c85417d6672.hot-update.js.map