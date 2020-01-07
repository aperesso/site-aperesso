webpackHotUpdate("static/development/pages/index.js",{

/***/ "./node_modules/three/examples/jsm/postprocessing/GlitchPass.js":
/*!**********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/postprocessing/GlitchPass.js ***!
  \**********************************************************************/
/*! exports provided: GlitchPass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlitchPass", function() { return GlitchPass; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/create */ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../build/three.module.js */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../postprocessing/Pass.js */ "./node_modules/three/examples/jsm/postprocessing/Pass.js");
/* harmony import */ var _shaders_DigitalGlitch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shaders/DigitalGlitch.js */ "./node_modules/three/examples/jsm/shaders/DigitalGlitch.js");



/**
 * @author alteredq / http://alteredqualia.com/
 */




var GlitchPass = function GlitchPass(dt_size) {
  _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__["Pass"].call(this);
  if (_shaders_DigitalGlitch_js__WEBPACK_IMPORTED_MODULE_4__["DigitalGlitch"] === undefined) console.error("GlitchPass relies on DigitalGlitch");
  var shader = _shaders_DigitalGlitch_js__WEBPACK_IMPORTED_MODULE_4__["DigitalGlitch"];
  this.uniforms = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["UniformsUtils"].clone(shader.uniforms);
  if (dt_size == undefined) dt_size = 64;
  this.uniforms["tDisp"].value = this.generateHeightmap(dt_size);
  this.material = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["ShaderMaterial"]({
    uniforms: this.uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader
  });
  this.fsQuad = new _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__["Pass"].FullScreenQuad(this.material);
  this.goWild = false;
  this.curF = 0;
  this.generateTrigger();
};

GlitchPass.prototype = _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()(_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default()(_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__["Pass"].prototype), {
  constructor: GlitchPass,
  render: function render(renderer, writeBuffer, readBuffer
  /*, deltaTime, maskActive */
  ) {
    this.uniforms["tDiffuse"].value = readBuffer.texture;
    this.uniforms['seed'].value = Math.random(); //default seeding

    this.uniforms['byp'].value = 0;

    if (this.curF % this.randX == 0 || this.goWild == true) {
      this.uniforms['amount'].value = Math.random() / 30;
      this.uniforms['angle'].value = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Math"].randFloat(-Math.PI, Math.PI);
      this.uniforms['seed_x'].value = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Math"].randFloat(-1, 1);
      this.uniforms['seed_y'].value = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Math"].randFloat(-1, 1);
      this.uniforms['distortion_x'].value = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Math"].randFloat(0, 1);
      this.uniforms['distortion_y'].value = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Math"].randFloat(0, 1);
      this.curF = 0;
      this.generateTrigger();
    } else if (this.curF % this.randX < this.randX / 5) {
      this.uniforms['amount'].value = Math.random() / 90;
      this.uniforms['angle'].value = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Math"].randFloat(-Math.PI, Math.PI);
      this.uniforms['distortion_x'].value = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Math"].randFloat(0, 1);
      this.uniforms['distortion_y'].value = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Math"].randFloat(0, 1);
      this.uniforms['seed_x'].value = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Math"].randFloat(-0.3, 0.3);
      this.uniforms['seed_y'].value = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Math"].randFloat(-0.3, 0.3);
    } else if (this.goWild == false) {
      this.uniforms['byp'].value = 1;
    }

    this.curF++;

    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer);
      if (this.clear) renderer.clear();
      this.fsQuad.render(renderer);
    }
  },
  generateTrigger: function generateTrigger() {
    this.randX = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Math"].randInt(120, 240);
  },
  generateHeightmap: function generateHeightmap(dt_size) {
    var data_arr = new Float32Array(dt_size * dt_size * 3);
    var length = dt_size * dt_size;

    for (var i = 0; i < length; i++) {
      var val = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Math"].randFloat(0, 1);

      data_arr[i * 3 + 0] = val;
      data_arr[i * 3 + 1] = val;
      data_arr[i * 3 + 2] = val;
    }

    return new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["DataTexture"](data_arr, dt_size, dt_size, _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["RGBFormat"], _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["FloatType"]);
  }
});


/***/ }),

/***/ "./node_modules/three/examples/jsm/shaders/DigitalGlitch.js":
/*!******************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/DigitalGlitch.js ***!
  \******************************************************************/
/*! exports provided: DigitalGlitch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DigitalGlitch", function() { return DigitalGlitch; });
/**
 * @author felixturner / http://airtight.cc/
 *
 * RGB Shift Shader
 * Shifts red and blue channels from center in opposite directions
 * Ported from http://kriss.cx/tom/2009/05/rgb-shift/
 * by Tom Butterworth / http://kriss.cx/tom/
 *
 * amount: shift distance (1 is width of input)
 * angle: shift angle in radians
 */
var DigitalGlitch = {
  uniforms: {
    "tDiffuse": {
      value: null
    },
    //diffuse texture
    "tDisp": {
      value: null
    },
    //displacement texture for digital glitch squares
    "byp": {
      value: 0
    },
    //apply the glitch ?
    "amount": {
      value: 0.08
    },
    "angle": {
      value: 0.02
    },
    "seed": {
      value: 0.02
    },
    "seed_x": {
      value: 0.02
    },
    //-1,1
    "seed_y": {
      value: 0.02
    },
    //-1,1
    "distortion_x": {
      value: 0.5
    },
    "distortion_y": {
      value: 0.6
    },
    "col_s": {
      value: 0.05
    }
  },
  vertexShader: ["varying vec2 vUv;", "void main() {", "	vUv = uv;", "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
  fragmentShader: ["uniform int byp;", //should we apply the glitch ?
  "uniform sampler2D tDiffuse;", "uniform sampler2D tDisp;", "uniform float amount;", "uniform float angle;", "uniform float seed;", "uniform float seed_x;", "uniform float seed_y;", "uniform float distortion_x;", "uniform float distortion_y;", "uniform float col_s;", "varying vec2 vUv;", "float rand(vec2 co){", "	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);", "}", "void main() {", "	if(byp<1) {", "		vec2 p = vUv;", "		float xs = floor(gl_FragCoord.x / 0.5);", "		float ys = floor(gl_FragCoord.y / 0.5);", //based on staffantans glitch shader for unity https://github.com/staffantan/unityglitch
  "		vec4 normal = texture2D (tDisp, p*seed*seed);", "		if(p.y<distortion_x+col_s && p.y>distortion_x-col_s*seed) {", "			if(seed_x>0.){", "				p.y = 1. - (p.y + distortion_y);", "			}", "			else {", "				p.y = distortion_y;", "			}", "		}", "		if(p.x<distortion_y+col_s && p.x>distortion_y-col_s*seed) {", "			if(seed_y>0.){", "				p.x=distortion_x;", "			}", "			else {", "				p.x = 1. - (p.x + distortion_x);", "			}", "		}", "		p.x+=normal.x*seed_x*(seed/5.);", "		p.y+=normal.y*seed_y*(seed/5.);", //base from RGB shift shader
  "		vec2 offset = amount * vec2( cos(angle), sin(angle));", "		vec4 cr = texture2D(tDiffuse, p + offset);", "		vec4 cga = texture2D(tDiffuse, p);", "		vec4 cb = texture2D(tDiffuse, p - offset);", "		gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);", //add noise
  "		vec4 snow = 200.*amount*vec4(rand(vec2(xs * seed,ys * seed*50.))*0.2);", "		gl_FragColor = gl_FragColor+ snow;", "	}", "	else {", "		gl_FragColor=texture2D (tDiffuse, vUv);", "	}", "}"].join("\n")
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
/* harmony import */ var three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/postprocessing/RenderPass */ "./node_modules/three/examples/jsm/postprocessing/RenderPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_GlitchPass_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/postprocessing/GlitchPass.js */ "./node_modules/three/examples/jsm/postprocessing/GlitchPass.js");
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
  var renderScene = new three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_4__["RenderPass"](scene, camera);
  composer.addPass(renderScene);
  var filmPass = new three_examples_jsm_postprocessing_FilmPass__WEBPACK_IMPORTED_MODULE_3__["FilmPass"](0.35, 0.25, 648, false);
  composer.addPass(filmPass);
  var glitchPass = new three_examples_jsm_postprocessing_GlitchPass_js__WEBPACK_IMPORTED_MODULE_5__["GlitchPass"](0.1);
  composer.addPass(glitchPass);
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
//# sourceMappingURL=index.js.1693eb4eb0cfa2ad0187.hot-update.js.map