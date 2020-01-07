webpackHotUpdate("static/development/pages/index.js",{

/***/ "./node_modules/three/examples/jsm/postprocessing/BloomPass.js":
/*!*********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/postprocessing/BloomPass.js ***!
  \*********************************************************************/
/*! exports provided: BloomPass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BloomPass", function() { return BloomPass; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/create */ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../build/three.module.js */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../postprocessing/Pass.js */ "./node_modules/three/examples/jsm/postprocessing/Pass.js");
/* harmony import */ var _shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shaders/CopyShader.js */ "./node_modules/three/examples/jsm/shaders/CopyShader.js");
/* harmony import */ var _shaders_ConvolutionShader_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shaders/ConvolutionShader.js */ "./node_modules/three/examples/jsm/shaders/ConvolutionShader.js");



/**
 * @author alteredq / http://alteredqualia.com/
 */





var BloomPass = function BloomPass(strength, kernelSize, sigma, resolution) {
  _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__["Pass"].call(this);
  strength = strength !== undefined ? strength : 1;
  kernelSize = kernelSize !== undefined ? kernelSize : 25;
  sigma = sigma !== undefined ? sigma : 4.0;
  resolution = resolution !== undefined ? resolution : 256; // render targets

  var pars = {
    minFilter: _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["LinearFilter"],
    magFilter: _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["LinearFilter"],
    format: _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["RGBAFormat"]
  };
  this.renderTargetX = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["WebGLRenderTarget"](resolution, resolution, pars);
  this.renderTargetX.texture.name = "BloomPass.x";
  this.renderTargetY = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["WebGLRenderTarget"](resolution, resolution, pars);
  this.renderTargetY.texture.name = "BloomPass.y"; // copy material

  if (_shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_4__["CopyShader"] === undefined) console.error("BloomPass relies on CopyShader");
  var copyShader = _shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_4__["CopyShader"];
  this.copyUniforms = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["UniformsUtils"].clone(copyShader.uniforms);
  this.copyUniforms["opacity"].value = strength;
  this.materialCopy = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["ShaderMaterial"]({
    uniforms: this.copyUniforms,
    vertexShader: copyShader.vertexShader,
    fragmentShader: copyShader.fragmentShader,
    blending: _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["AdditiveBlending"],
    transparent: true
  }); // convolution material

  if (_shaders_ConvolutionShader_js__WEBPACK_IMPORTED_MODULE_5__["ConvolutionShader"] === undefined) console.error("BloomPass relies on ConvolutionShader");
  var convolutionShader = _shaders_ConvolutionShader_js__WEBPACK_IMPORTED_MODULE_5__["ConvolutionShader"];
  this.convolutionUniforms = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["UniformsUtils"].clone(convolutionShader.uniforms);
  this.convolutionUniforms["uImageIncrement"].value = BloomPass.blurX;
  this.convolutionUniforms["cKernel"].value = _shaders_ConvolutionShader_js__WEBPACK_IMPORTED_MODULE_5__["ConvolutionShader"].buildKernel(sigma);
  this.materialConvolution = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["ShaderMaterial"]({
    uniforms: this.convolutionUniforms,
    vertexShader: convolutionShader.vertexShader,
    fragmentShader: convolutionShader.fragmentShader,
    defines: {
      "KERNEL_SIZE_FLOAT": kernelSize.toFixed(1),
      "KERNEL_SIZE_INT": kernelSize.toFixed(0)
    }
  });
  this.needsSwap = false;
  this.fsQuad = new _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__["Pass"].FullScreenQuad(null);
};

BloomPass.prototype = _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()(_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default()(_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__["Pass"].prototype), {
  constructor: BloomPass,
  render: function render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
    if (maskActive) renderer.state.buffers.stencil.setTest(false); // Render quad with blured scene into texture (convolution pass 1)

    this.fsQuad.material = this.materialConvolution;
    this.convolutionUniforms["tDiffuse"].value = readBuffer.texture;
    this.convolutionUniforms["uImageIncrement"].value = BloomPass.blurX;
    renderer.setRenderTarget(this.renderTargetX);
    renderer.clear();
    this.fsQuad.render(renderer); // Render quad with blured scene into texture (convolution pass 2)

    this.convolutionUniforms["tDiffuse"].value = this.renderTargetX.texture;
    this.convolutionUniforms["uImageIncrement"].value = BloomPass.blurY;
    renderer.setRenderTarget(this.renderTargetY);
    renderer.clear();
    this.fsQuad.render(renderer); // Render original scene with superimposed blur to texture

    this.fsQuad.material = this.materialCopy;
    this.copyUniforms["tDiffuse"].value = this.renderTargetY.texture;
    if (maskActive) renderer.state.buffers.stencil.setTest(true);
    renderer.setRenderTarget(readBuffer);
    if (this.clear) renderer.clear();
    this.fsQuad.render(renderer);
  }
});
BloomPass.blurX = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Vector2"](0.001953125, 0.0);
BloomPass.blurY = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Vector2"](0.0, 0.001953125);


/***/ }),

/***/ "./node_modules/three/examples/jsm/shaders/ConvolutionShader.js":
/*!**********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/ConvolutionShader.js ***!
  \**********************************************************************/
/*! exports provided: ConvolutionShader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConvolutionShader", function() { return ConvolutionShader; });
/* harmony import */ var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../build/three.module.js */ "./node_modules/three/build/three.module.js");
/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Convolution shader
 * ported from o3d sample to WebGL / GLSL
 * http://o3d.googlecode.com/svn/trunk/samples/convolution.html
 */

var ConvolutionShader = {
  defines: {
    "KERNEL_SIZE_FLOAT": "25.0",
    "KERNEL_SIZE_INT": "25"
  },
  uniforms: {
    "tDiffuse": {
      value: null
    },
    "uImageIncrement": {
      value: new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"](0.001953125, 0.0)
    },
    "cKernel": {
      value: []
    }
  },
  vertexShader: ["uniform vec2 uImageIncrement;", "varying vec2 vUv;", "void main() {", "	vUv = uv - ( ( KERNEL_SIZE_FLOAT - 1.0 ) / 2.0 ) * uImageIncrement;", "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
  fragmentShader: ["uniform float cKernel[ KERNEL_SIZE_INT ];", "uniform sampler2D tDiffuse;", "uniform vec2 uImageIncrement;", "varying vec2 vUv;", "void main() {", "	vec2 imageCoord = vUv;", "	vec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );", "	for( int i = 0; i < KERNEL_SIZE_INT; i ++ ) {", "		sum += texture2D( tDiffuse, imageCoord ) * cKernel[ i ];", "		imageCoord += uImageIncrement;", "	}", "	gl_FragColor = sum;", "}"].join("\n"),
  buildKernel: function buildKernel(sigma) {
    // We lop off the sqrt(2 * pi) * sigma term, since we're going to normalize anyway.
    function gauss(x, sigma) {
      return Math.exp(-(x * x) / (2.0 * sigma * sigma));
    }

    var i,
        values,
        sum,
        halfWidth,
        kMaxKernelSize = 25,
        kernelSize = 2 * Math.ceil(sigma * 3.0) + 1;
    if (kernelSize > kMaxKernelSize) kernelSize = kMaxKernelSize;
    halfWidth = (kernelSize - 1) * 0.5;
    values = new Array(kernelSize);
    sum = 0.0;

    for (i = 0; i < kernelSize; ++i) {
      values[i] = gauss(i - halfWidth, sigma);
      sum += values[i];
    } // normalize the kernel


    for (i = 0; i < kernelSize; ++i) {
      values[i] /= sum;
    }

    return values;
  }
};


/***/ }),

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
/* harmony import */ var three_examples_jsm_postprocessing_BloomPass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/postprocessing/BloomPass */ "./node_modules/three/examples/jsm/postprocessing/BloomPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/postprocessing/RenderPass */ "./node_modules/three/examples/jsm/postprocessing/RenderPass.js");
/* harmony import */ var _utils_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/settings */ "./webgl/utils/settings.js");
/* harmony import */ var _utils_audio__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/audio */ "./webgl/utils/audio.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils */ "./webgl/utils/index.js");
/* harmony import */ var _scene_sphere__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scene/sphere */ "./webgl/scene/sphere.js");
/* harmony import */ var _scene_particles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./scene/particles */ "./webgl/scene/particles.js");












var WebGL = function WebGL() {
  var canvas = document.getElementById('webGL');

  var _getDimensions = Object(_utils__WEBPACK_IMPORTED_MODULE_8__["getDimensions"])('webGL'),
      width = _getDimensions.width,
      height = _getDimensions.height;

  var scene = new three__WEBPACK_IMPORTED_MODULE_1__["Scene"]();
  var camera = new three__WEBPACK_IMPORTED_MODULE_1__["PerspectiveCamera"](_utils_settings__WEBPACK_IMPORTED_MODULE_6__["CAMERA_SETTINGS"].fov, width / height, _utils_settings__WEBPACK_IMPORTED_MODULE_6__["CAMERA_SETTINGS"].near, _utils_settings__WEBPACK_IMPORTED_MODULE_6__["CAMERA_SETTINGS"].far);
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
  var renderScene = new three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_5__["RenderPass"](scene, camera);
  composer.addPass(renderScene);
  var bloomPass = new bloomPass(0.5);
  composer.addPass(bloomPass);
  var filmPass = new three_examples_jsm_postprocessing_FilmPass__WEBPACK_IMPORTED_MODULE_3__["FilmPass"](0.35, 0.25, 648, false);
  composer.addPass(filmPass);
  var audio = new _utils_audio__WEBPACK_IMPORTED_MODULE_7__["default"]();
  var sphere = new _scene_sphere__WEBPACK_IMPORTED_MODULE_9__["default"]();
  var particles = new _scene_particles__WEBPACK_IMPORTED_MODULE_10__["default"]();

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
//# sourceMappingURL=index.js.4dde578bb31e3d0053ca.hot-update.js.map