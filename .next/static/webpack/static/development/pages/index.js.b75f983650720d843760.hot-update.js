webpackHotUpdate("static/development/pages/index.js",{

/***/ "./node_modules/three/examples/jsm/postprocessing/EffectComposer.js":
/*!**************************************************************************!*\
  !*** ./node_modules/three/examples/jsm/postprocessing/EffectComposer.js ***!
  \**************************************************************************/
/*! exports provided: EffectComposer, Pass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EffectComposer", function() { return EffectComposer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pass", function() { return Pass; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../build/three.module.js */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shaders/CopyShader.js */ "./node_modules/three/examples/jsm/shaders/CopyShader.js");
/* harmony import */ var _postprocessing_ShaderPass_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../postprocessing/ShaderPass.js */ "./node_modules/three/examples/jsm/postprocessing/ShaderPass.js");
/* harmony import */ var _postprocessing_MaskPass_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../postprocessing/MaskPass.js */ "./node_modules/three/examples/jsm/postprocessing/MaskPass.js");



/**
 * @author alteredq / http://alteredqualia.com/
 */






var EffectComposer = function EffectComposer(renderer, renderTarget) {
  this.renderer = renderer;

  if (renderTarget === undefined) {
    var parameters = {
      minFilter: _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["LinearFilter"],
      magFilter: _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["LinearFilter"],
      format: _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["RGBAFormat"],
      stencilBuffer: false
    };
    var size = renderer.getSize(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Vector2"]());
    this._pixelRatio = renderer.getPixelRatio();
    this._width = size.width;
    this._height = size.height;
    renderTarget = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["WebGLRenderTarget"](this._width * this._pixelRatio, this._height * this._pixelRatio, parameters);
    renderTarget.texture.name = 'EffectComposer.rt1';
  } else {
    this._pixelRatio = 1;
    this._width = renderTarget.width;
    this._height = renderTarget.height;
  }

  this.renderTarget1 = renderTarget;
  this.renderTarget2 = renderTarget.clone();
  this.renderTarget2.texture.name = 'EffectComposer.rt2';
  this.writeBuffer = this.renderTarget1;
  this.readBuffer = this.renderTarget2;
  this.renderToScreen = true;
  this.passes = []; // dependencies

  if (_shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_3__["CopyShader"] === undefined) {
    console.error('THREE.EffectComposer relies on CopyShader');
  }

  if (_postprocessing_ShaderPass_js__WEBPACK_IMPORTED_MODULE_4__["ShaderPass"] === undefined) {
    console.error('THREE.EffectComposer relies on ShaderPass');
  }

  this.copyPass = new _postprocessing_ShaderPass_js__WEBPACK_IMPORTED_MODULE_4__["ShaderPass"](_shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_3__["CopyShader"]);
  this.clock = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Clock"]();
};

_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()(EffectComposer.prototype, {
  swapBuffers: function swapBuffers() {
    var tmp = this.readBuffer;
    this.readBuffer = this.writeBuffer;
    this.writeBuffer = tmp;
  },
  addPass: function addPass(pass) {
    this.passes.push(pass);
    pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  },
  insertPass: function insertPass(pass, index) {
    this.passes.splice(index, 0, pass);
  },
  isLastEnabledPass: function isLastEnabledPass(passIndex) {
    for (var i = passIndex + 1; i < this.passes.length; i++) {
      if (this.passes[i].enabled) {
        return false;
      }
    }

    return true;
  },
  render: function render(deltaTime) {
    // deltaTime value is in seconds
    if (deltaTime === undefined) {
      deltaTime = this.clock.getDelta();
    }

    var currentRenderTarget = this.renderer.getRenderTarget();
    var maskActive = false;
    var pass,
        i,
        il = this.passes.length;

    for (i = 0; i < il; i++) {
      pass = this.passes[i];
      if (pass.enabled === false) continue;
      pass.renderToScreen = this.renderToScreen && this.isLastEnabledPass(i);
      pass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime, maskActive);

      if (pass.needsSwap) {
        if (maskActive) {
          var context = this.renderer.getContext();
          var stencil = this.renderer.state.buffers.stencil; //context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );

          stencil.setFunc(context.NOTEQUAL, 1, 0xffffffff);
          this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime); //context.stencilFunc( context.EQUAL, 1, 0xffffffff );

          stencil.setFunc(context.EQUAL, 1, 0xffffffff);
        }

        this.swapBuffers();
      }

      if (_postprocessing_MaskPass_js__WEBPACK_IMPORTED_MODULE_5__["MaskPass"] !== undefined) {
        if (pass instanceof _postprocessing_MaskPass_js__WEBPACK_IMPORTED_MODULE_5__["MaskPass"]) {
          maskActive = true;
        } else if (pass instanceof _postprocessing_MaskPass_js__WEBPACK_IMPORTED_MODULE_5__["ClearMaskPass"]) {
          maskActive = false;
        }
      }
    }

    this.renderer.setRenderTarget(currentRenderTarget);
  },
  reset: function reset(renderTarget) {
    if (renderTarget === undefined) {
      var size = this.renderer.getSize(new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Vector2"]());
      this._pixelRatio = this.renderer.getPixelRatio();
      this._width = size.width;
      this._height = size.height;
      renderTarget = this.renderTarget1.clone();
      renderTarget.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }

    this.renderTarget1.dispose();
    this.renderTarget2.dispose();
    this.renderTarget1 = renderTarget;
    this.renderTarget2 = renderTarget.clone();
    this.writeBuffer = this.renderTarget1;
    this.readBuffer = this.renderTarget2;
  },
  setSize: function setSize(width, height) {
    this._width = width;
    this._height = height;
    var effectiveWidth = this._width * this._pixelRatio;
    var effectiveHeight = this._height * this._pixelRatio;
    this.renderTarget1.setSize(effectiveWidth, effectiveHeight);
    this.renderTarget2.setSize(effectiveWidth, effectiveHeight);

    for (var i = 0; i < this.passes.length; i++) {
      this.passes[i].setSize(effectiveWidth, effectiveHeight);
    }
  },
  setPixelRatio: function setPixelRatio(pixelRatio) {
    this._pixelRatio = pixelRatio;
    this.setSize(this._width, this._height);
  }
});

var Pass = function Pass() {
  // if set to true, the pass is processed by the composer
  this.enabled = true; // if set to true, the pass indicates to swap read and write buffer after rendering

  this.needsSwap = true; // if set to true, the pass clears its buffer before rendering

  this.clear = false; // if set to true, the result of the pass is rendered to screen. This is set automatically by EffectComposer.

  this.renderToScreen = false;
};

_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()(Pass.prototype, {
  setSize: function setSize()
  /* width, height */
  {},
  render: function render()
  /* renderer, writeBuffer, readBuffer, deltaTime, maskActive */
  {
    console.error('THREE.Pass: .render() must be implemented in derived pass.');
  }
}); // Helper for passes that need to fill the viewport with a single quad.


Pass.FullScreenQuad = function () {
  var camera = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["OrthographicCamera"](-1, 1, 1, -1, 0, 1);
  var geometry = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["PlaneBufferGeometry"](2, 2);

  var FullScreenQuad = function FullScreenQuad(material) {
    this._mesh = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Mesh"](geometry, material);
  };

  _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(FullScreenQuad.prototype, 'material', {
    get: function get() {
      return this._mesh.material;
    },
    set: function set(value) {
      this._mesh.material = value;
    }
  });

  _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()(FullScreenQuad.prototype, {
    dispose: function dispose() {
      this._mesh.geometry.dispose();
    },
    render: function render(renderer) {
      renderer.render(this._mesh, camera);
    }
  });

  return FullScreenQuad;
}();



/***/ }),

/***/ "./node_modules/three/examples/jsm/postprocessing/MaskPass.js":
/*!********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/postprocessing/MaskPass.js ***!
  \********************************************************************/
/*! exports provided: MaskPass, ClearMaskPass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskPass", function() { return MaskPass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClearMaskPass", function() { return ClearMaskPass; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/create */ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../postprocessing/Pass.js */ "./node_modules/three/examples/jsm/postprocessing/Pass.js");



/**
 * @author alteredq / http://alteredqualia.com/
 */


var MaskPass = function MaskPass(scene, camera) {
  _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_2__["Pass"].call(this);
  this.scene = scene;
  this.camera = camera;
  this.clear = true;
  this.needsSwap = false;
  this.inverse = false;
};

MaskPass.prototype = _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()(_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default()(_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_2__["Pass"].prototype), {
  constructor: MaskPass,
  render: function render(renderer, writeBuffer, readBuffer
  /*, deltaTime, maskActive */
  ) {
    var context = renderer.getContext();
    var state = renderer.state; // don't update color or depth

    state.buffers.color.setMask(false);
    state.buffers.depth.setMask(false); // lock buffers

    state.buffers.color.setLocked(true);
    state.buffers.depth.setLocked(true); // set up stencil

    var writeValue, clearValue;

    if (this.inverse) {
      writeValue = 0;
      clearValue = 1;
    } else {
      writeValue = 1;
      clearValue = 0;
    }

    state.buffers.stencil.setTest(true);
    state.buffers.stencil.setOp(context.REPLACE, context.REPLACE, context.REPLACE);
    state.buffers.stencil.setFunc(context.ALWAYS, writeValue, 0xffffffff);
    state.buffers.stencil.setClear(clearValue);
    state.buffers.stencil.setLocked(true); // draw into the stencil buffer

    renderer.setRenderTarget(readBuffer);
    if (this.clear) renderer.clear();
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(writeBuffer);
    if (this.clear) renderer.clear();
    renderer.render(this.scene, this.camera); // unlock color and depth buffer for subsequent rendering

    state.buffers.color.setLocked(false);
    state.buffers.depth.setLocked(false); // only render where stencil is set to 1

    state.buffers.stencil.setLocked(false);
    state.buffers.stencil.setFunc(context.EQUAL, 1, 0xffffffff); // draw if == 1

    state.buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP);
    state.buffers.stencil.setLocked(true);
  }
});

var ClearMaskPass = function ClearMaskPass() {
  _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_2__["Pass"].call(this);
  this.needsSwap = false;
};

ClearMaskPass.prototype = _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default()(_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_2__["Pass"].prototype);

_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()(ClearMaskPass.prototype, {
  render: function render(renderer
  /*, writeBuffer, readBuffer, deltaTime, maskActive */
  ) {
    renderer.state.buffers.stencil.setLocked(false);
    renderer.state.buffers.stencil.setTest(false);
  }
});



/***/ }),

/***/ "./node_modules/three/examples/jsm/postprocessing/Pass.js":
/*!****************************************************************!*\
  !*** ./node_modules/three/examples/jsm/postprocessing/Pass.js ***!
  \****************************************************************/
/*! exports provided: Pass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pass", function() { return Pass; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../build/three.module.js */ "./node_modules/three/build/three.module.js");




function Pass() {
  // if set to true, the pass is processed by the composer
  this.enabled = true; // if set to true, the pass indicates to swap read and write buffer after rendering

  this.needsSwap = true; // if set to true, the pass clears its buffer before rendering

  this.clear = false; // if set to true, the result of the pass is rendered to screen. This is set automatically by EffectComposer.

  this.renderToScreen = false;
}

_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()(Pass.prototype, {
  setSize: function setSize()
  /* width, height */
  {},
  render: function render()
  /* renderer, writeBuffer, readBuffer, deltaTime, maskActive */
  {
    console.error('THREE.Pass: .render() must be implemented in derived pass.');
  }
}); // Helper for passes that need to fill the viewport with a single quad.


Pass.FullScreenQuad = function () {
  var camera = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["OrthographicCamera"](-1, 1, 1, -1, 0, 1);
  var geometry = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["PlaneBufferGeometry"](2, 2);

  var FullScreenQuad = function FullScreenQuad(material) {
    this._mesh = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Mesh"](geometry, material);
  };

  _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(FullScreenQuad.prototype, 'material', {
    get: function get() {
      return this._mesh.material;
    },
    set: function set(value) {
      this._mesh.material = value;
    }
  });

  _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()(FullScreenQuad.prototype, {
    dispose: function dispose() {
      this._mesh.geometry.dispose();
    },
    render: function render(renderer) {
      renderer.render(this._mesh, camera);
    }
  });

  return FullScreenQuad;
}();



/***/ }),

/***/ "./node_modules/three/examples/jsm/postprocessing/RenderPass.js":
/*!**********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/postprocessing/RenderPass.js ***!
  \**********************************************************************/
/*! exports provided: RenderPass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderPass", function() { return RenderPass; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/create */ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../postprocessing/Pass.js */ "./node_modules/three/examples/jsm/postprocessing/Pass.js");



/**
 * @author alteredq / http://alteredqualia.com/
 */


var RenderPass = function RenderPass(scene, camera, overrideMaterial, clearColor, clearAlpha) {
  _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_2__["Pass"].call(this);
  this.scene = scene;
  this.camera = camera;
  this.overrideMaterial = overrideMaterial;
  this.clearColor = clearColor;
  this.clearAlpha = clearAlpha !== undefined ? clearAlpha : 0;
  this.clear = true;
  this.clearDepth = false;
  this.needsSwap = false;
};

RenderPass.prototype = _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()(_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default()(_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_2__["Pass"].prototype), {
  constructor: RenderPass,
  render: function render(renderer, writeBuffer, readBuffer
  /*, deltaTime, maskActive */
  ) {
    var oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;
    this.scene.overrideMaterial = this.overrideMaterial;
    var oldClearColor, oldClearAlpha;

    if (this.clearColor) {
      oldClearColor = renderer.getClearColor().getHex();
      oldClearAlpha = renderer.getClearAlpha();
      renderer.setClearColor(this.clearColor, this.clearAlpha);
    }

    if (this.clearDepth) {
      renderer.clearDepth();
    }

    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer); // TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600

    if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
    renderer.render(this.scene, this.camera);

    if (this.clearColor) {
      renderer.setClearColor(oldClearColor, oldClearAlpha);
    }

    this.scene.overrideMaterial = null;
    renderer.autoClear = oldAutoClear;
  }
});


/***/ }),

/***/ "./node_modules/three/examples/jsm/postprocessing/ShaderPass.js":
/*!**********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/postprocessing/ShaderPass.js ***!
  \**********************************************************************/
/*! exports provided: ShaderPass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShaderPass", function() { return ShaderPass; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/create */ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../build/three.module.js */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../postprocessing/Pass.js */ "./node_modules/three/examples/jsm/postprocessing/Pass.js");



/**
 * @author alteredq / http://alteredqualia.com/
 */



var ShaderPass = function ShaderPass(shader, textureID) {
  _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__["Pass"].call(this);
  this.textureID = textureID !== undefined ? textureID : "tDiffuse";

  if (shader instanceof _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["ShaderMaterial"]) {
    this.uniforms = shader.uniforms;
    this.material = shader;
  } else if (shader) {
    this.uniforms = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["UniformsUtils"].clone(shader.uniforms);
    this.material = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["ShaderMaterial"]({
      defines: _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, shader.defines),
      uniforms: this.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader
    });
  }

  this.fsQuad = new _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__["Pass"].FullScreenQuad(this.material);
};

ShaderPass.prototype = _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()(_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default()(_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__["Pass"].prototype), {
  constructor: ShaderPass,
  render: function render(renderer, writeBuffer, readBuffer
  /*, deltaTime, maskActive */
  ) {
    if (this.uniforms[this.textureID]) {
      this.uniforms[this.textureID].value = readBuffer.texture;
    }

    this.fsQuad.material = this.material;

    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer); // TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600

      if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
      this.fsQuad.render(renderer);
    }
  }
});


/***/ }),

/***/ "./node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js":
/*!***************************************************************************!*\
  !*** ./node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js ***!
  \***************************************************************************/
/*! exports provided: UnrealBloomPass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnrealBloomPass", function() { return UnrealBloomPass; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/create */ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../build/three.module.js */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../postprocessing/Pass.js */ "./node_modules/three/examples/jsm/postprocessing/Pass.js");
/* harmony import */ var _shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shaders/CopyShader.js */ "./node_modules/three/examples/jsm/shaders/CopyShader.js");
/* harmony import */ var _shaders_LuminosityHighPassShader_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shaders/LuminosityHighPassShader.js */ "./node_modules/three/examples/jsm/shaders/LuminosityHighPassShader.js");



/**
 * @author spidersharma / http://eduperiment.com/
 */




/**
 * UnrealBloomPass is inspired by the bloom pass of Unreal Engine. It creates a
 * mip map chain of bloom textures and blurs them with different radii. Because
 * of the weighted combination of mips, and because larger blurs are done on
 * higher mips, this effect provides good quality and performance.
 *
 * Reference:
 * - https://docs.unrealengine.com/latest/INT/Engine/Rendering/PostProcessEffects/Bloom/
 */

var UnrealBloomPass = function UnrealBloomPass(resolution, strength, radius, threshold) {
  _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__["Pass"].call(this);
  this.strength = strength !== undefined ? strength : 1;
  this.radius = radius;
  this.threshold = threshold;
  this.resolution = resolution !== undefined ? new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Vector2"](resolution.x, resolution.y) : new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Vector2"](256, 256); // create color only once here, reuse it later inside the render function

  this.clearColor = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Color"](0, 0, 0); // render targets

  var pars = {
    minFilter: _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["LinearFilter"],
    magFilter: _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["LinearFilter"],
    format: _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["RGBAFormat"]
  };
  this.renderTargetsHorizontal = [];
  this.renderTargetsVertical = [];
  this.nMips = 5;
  var resx = Math.round(this.resolution.x / 2);
  var resy = Math.round(this.resolution.y / 2);
  this.renderTargetBright = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["WebGLRenderTarget"](resx, resy, pars);
  this.renderTargetBright.texture.name = "UnrealBloomPass.bright";
  this.renderTargetBright.texture.generateMipmaps = false;

  for (var i = 0; i < this.nMips; i++) {
    var renderTargetHorizonal = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["WebGLRenderTarget"](resx, resy, pars);
    renderTargetHorizonal.texture.name = "UnrealBloomPass.h" + i;
    renderTargetHorizonal.texture.generateMipmaps = false;
    this.renderTargetsHorizontal.push(renderTargetHorizonal);
    var renderTargetVertical = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["WebGLRenderTarget"](resx, resy, pars);
    renderTargetVertical.texture.name = "UnrealBloomPass.v" + i;
    renderTargetVertical.texture.generateMipmaps = false;
    this.renderTargetsVertical.push(renderTargetVertical);
    resx = Math.round(resx / 2);
    resy = Math.round(resy / 2);
  } // luminosity high pass material


  if (_shaders_LuminosityHighPassShader_js__WEBPACK_IMPORTED_MODULE_5__["LuminosityHighPassShader"] === undefined) console.error("UnrealBloomPass relies on LuminosityHighPassShader");
  var highPassShader = _shaders_LuminosityHighPassShader_js__WEBPACK_IMPORTED_MODULE_5__["LuminosityHighPassShader"];
  this.highPassUniforms = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["UniformsUtils"].clone(highPassShader.uniforms);
  this.highPassUniforms["luminosityThreshold"].value = threshold;
  this.highPassUniforms["smoothWidth"].value = 0.01;
  this.materialHighPassFilter = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["ShaderMaterial"]({
    uniforms: this.highPassUniforms,
    vertexShader: highPassShader.vertexShader,
    fragmentShader: highPassShader.fragmentShader,
    defines: {}
  }); // Gaussian Blur Materials

  this.separableBlurMaterials = [];
  var kernelSizeArray = [3, 5, 7, 9, 11];
  var resx = Math.round(this.resolution.x / 2);
  var resy = Math.round(this.resolution.y / 2);

  for (var i = 0; i < this.nMips; i++) {
    this.separableBlurMaterials.push(this.getSeperableBlurMaterial(kernelSizeArray[i]));
    this.separableBlurMaterials[i].uniforms["texSize"].value = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Vector2"](resx, resy);
    resx = Math.round(resx / 2);
    resy = Math.round(resy / 2);
  } // Composite material


  this.compositeMaterial = this.getCompositeMaterial(this.nMips);
  this.compositeMaterial.uniforms["blurTexture1"].value = this.renderTargetsVertical[0].texture;
  this.compositeMaterial.uniforms["blurTexture2"].value = this.renderTargetsVertical[1].texture;
  this.compositeMaterial.uniforms["blurTexture3"].value = this.renderTargetsVertical[2].texture;
  this.compositeMaterial.uniforms["blurTexture4"].value = this.renderTargetsVertical[3].texture;
  this.compositeMaterial.uniforms["blurTexture5"].value = this.renderTargetsVertical[4].texture;
  this.compositeMaterial.uniforms["bloomStrength"].value = strength;
  this.compositeMaterial.uniforms["bloomRadius"].value = 0.1;
  this.compositeMaterial.needsUpdate = true;
  var bloomFactors = [1.0, 0.8, 0.6, 0.4, 0.2];
  this.compositeMaterial.uniforms["bloomFactors"].value = bloomFactors;
  this.bloomTintColors = [new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Vector3"](1, 1, 1), new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Vector3"](1, 1, 1), new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Vector3"](1, 1, 1), new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Vector3"](1, 1, 1), new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Vector3"](1, 1, 1)];
  this.compositeMaterial.uniforms["bloomTintColors"].value = this.bloomTintColors; // copy material

  if (_shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_4__["CopyShader"] === undefined) {
    console.error("UnrealBloomPass relies on CopyShader");
  }

  var copyShader = _shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_4__["CopyShader"];
  this.copyUniforms = _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["UniformsUtils"].clone(copyShader.uniforms);
  this.copyUniforms["opacity"].value = 1.0;
  this.materialCopy = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["ShaderMaterial"]({
    uniforms: this.copyUniforms,
    vertexShader: copyShader.vertexShader,
    fragmentShader: copyShader.fragmentShader,
    blending: _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["AdditiveBlending"],
    depthTest: false,
    depthWrite: false,
    transparent: true
  });
  this.enabled = true;
  this.needsSwap = false;
  this.oldClearColor = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Color"]();
  this.oldClearAlpha = 1;
  this.basic = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["MeshBasicMaterial"]();
  this.fsQuad = new _postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__["Pass"].FullScreenQuad(null);
};

UnrealBloomPass.prototype = _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()(_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default()(_postprocessing_Pass_js__WEBPACK_IMPORTED_MODULE_3__["Pass"].prototype), {
  constructor: UnrealBloomPass,
  dispose: function dispose() {
    for (var i = 0; i < this.renderTargetsHorizontal.length; i++) {
      this.renderTargetsHorizontal[i].dispose();
    }

    for (var i = 0; i < this.renderTargetsVertical.length; i++) {
      this.renderTargetsVertical[i].dispose();
    }

    this.renderTargetBright.dispose();
  },
  setSize: function setSize(width, height) {
    var resx = Math.round(width / 2);
    var resy = Math.round(height / 2);
    this.renderTargetBright.setSize(resx, resy);

    for (var i = 0; i < this.nMips; i++) {
      this.renderTargetsHorizontal[i].setSize(resx, resy);
      this.renderTargetsVertical[i].setSize(resx, resy);
      this.separableBlurMaterials[i].uniforms["texSize"].value = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Vector2"](resx, resy);
      resx = Math.round(resx / 2);
      resy = Math.round(resy / 2);
    }
  },
  render: function render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
    this.oldClearColor.copy(renderer.getClearColor());
    this.oldClearAlpha = renderer.getClearAlpha();
    var oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;
    renderer.setClearColor(this.clearColor, 0);
    if (maskActive) renderer.state.buffers.stencil.setTest(false); // Render input to screen

    if (this.renderToScreen) {
      this.fsQuad.material = this.basic;
      this.basic.map = readBuffer.texture;
      renderer.setRenderTarget(null);
      renderer.clear();
      this.fsQuad.render(renderer);
    } // 1. Extract Bright Areas


    this.highPassUniforms["tDiffuse"].value = readBuffer.texture;
    this.highPassUniforms["luminosityThreshold"].value = this.threshold;
    this.fsQuad.material = this.materialHighPassFilter;
    renderer.setRenderTarget(this.renderTargetBright);
    renderer.clear();
    this.fsQuad.render(renderer); // 2. Blur All the mips progressively

    var inputRenderTarget = this.renderTargetBright;

    for (var i = 0; i < this.nMips; i++) {
      this.fsQuad.material = this.separableBlurMaterials[i];
      this.separableBlurMaterials[i].uniforms["colorTexture"].value = inputRenderTarget.texture;
      this.separableBlurMaterials[i].uniforms["direction"].value = UnrealBloomPass.BlurDirectionX;
      renderer.setRenderTarget(this.renderTargetsHorizontal[i]);
      renderer.clear();
      this.fsQuad.render(renderer);
      this.separableBlurMaterials[i].uniforms["colorTexture"].value = this.renderTargetsHorizontal[i].texture;
      this.separableBlurMaterials[i].uniforms["direction"].value = UnrealBloomPass.BlurDirectionY;
      renderer.setRenderTarget(this.renderTargetsVertical[i]);
      renderer.clear();
      this.fsQuad.render(renderer);
      inputRenderTarget = this.renderTargetsVertical[i];
    } // Composite All the mips


    this.fsQuad.material = this.compositeMaterial;
    this.compositeMaterial.uniforms["bloomStrength"].value = this.strength;
    this.compositeMaterial.uniforms["bloomRadius"].value = this.radius;
    this.compositeMaterial.uniforms["bloomTintColors"].value = this.bloomTintColors;
    renderer.setRenderTarget(this.renderTargetsHorizontal[0]);
    renderer.clear();
    this.fsQuad.render(renderer); // Blend it additively over the input texture

    this.fsQuad.material = this.materialCopy;
    this.copyUniforms["tDiffuse"].value = this.renderTargetsHorizontal[0].texture;
    if (maskActive) renderer.state.buffers.stencil.setTest(true);

    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(readBuffer);
      this.fsQuad.render(renderer);
    } // Restore renderer settings


    renderer.setClearColor(this.oldClearColor, this.oldClearAlpha);
    renderer.autoClear = oldAutoClear;
  },
  getSeperableBlurMaterial: function getSeperableBlurMaterial(kernelRadius) {
    return new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["ShaderMaterial"]({
      defines: {
        "KERNEL_RADIUS": kernelRadius,
        "SIGMA": kernelRadius
      },
      uniforms: {
        "colorTexture": {
          value: null
        },
        "texSize": {
          value: new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Vector2"](0.5, 0.5)
        },
        "direction": {
          value: new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Vector2"](0.5, 0.5)
        }
      },
      vertexShader: "varying vec2 vUv;\n\
				void main() {\n\
					vUv = uv;\n\
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\
				}",
      fragmentShader: "#include <common>\
				varying vec2 vUv;\n\
				uniform sampler2D colorTexture;\n\
				uniform vec2 texSize;\
				uniform vec2 direction;\
				\
				float gaussianPdf(in float x, in float sigma) {\
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;\
				}\
				void main() {\n\
					vec2 invSize = 1.0 / texSize;\
					float fSigma = float(SIGMA);\
					float weightSum = gaussianPdf(0.0, fSigma);\
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;\
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {\
						float x = float(i);\
						float w = gaussianPdf(x, fSigma);\
						vec2 uvOffset = direction * invSize * x;\
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;\
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;\
						diffuseSum += (sample1 + sample2) * w;\
						weightSum += 2.0 * w;\
					}\
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);\n\
				}"
    });
  },
  getCompositeMaterial: function getCompositeMaterial(nMips) {
    return new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["ShaderMaterial"]({
      defines: {
        "NUM_MIPS": nMips
      },
      uniforms: {
        "blurTexture1": {
          value: null
        },
        "blurTexture2": {
          value: null
        },
        "blurTexture3": {
          value: null
        },
        "blurTexture4": {
          value: null
        },
        "blurTexture5": {
          value: null
        },
        "dirtTexture": {
          value: null
        },
        "bloomStrength": {
          value: 1.0
        },
        "bloomFactors": {
          value: null
        },
        "bloomTintColors": {
          value: null
        },
        "bloomRadius": {
          value: 0.0
        }
      },
      vertexShader: "varying vec2 vUv;\n\
				void main() {\n\
					vUv = uv;\n\
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\
				}",
      fragmentShader: "varying vec2 vUv;\
				uniform sampler2D blurTexture1;\
				uniform sampler2D blurTexture2;\
				uniform sampler2D blurTexture3;\
				uniform sampler2D blurTexture4;\
				uniform sampler2D blurTexture5;\
				uniform sampler2D dirtTexture;\
				uniform float bloomStrength;\
				uniform float bloomRadius;\
				uniform float bloomFactors[NUM_MIPS];\
				uniform vec3 bloomTintColors[NUM_MIPS];\
				\
				float lerpBloomFactor(const in float factor) { \
					float mirrorFactor = 1.2 - factor;\
					return mix(factor, mirrorFactor, bloomRadius);\
				}\
				\
				void main() {\
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) + \
													 lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) + \
													 lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) + \
													 lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) + \
													 lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );\
				}"
    });
  }
});
UnrealBloomPass.BlurDirectionX = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Vector2"](1.0, 0.0);
UnrealBloomPass.BlurDirectionY = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_2__["Vector2"](0.0, 1.0);


/***/ }),

/***/ "./node_modules/three/examples/jsm/shaders/CopyShader.js":
/*!***************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/CopyShader.js ***!
  \***************************************************************/
/*! exports provided: CopyShader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CopyShader", function() { return CopyShader; });
/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Full-screen textured quad shader
 */
var CopyShader = {
  uniforms: {
    "tDiffuse": {
      value: null
    },
    "opacity": {
      value: 1.0
    }
  },
  vertexShader: ["varying vec2 vUv;", "void main() {", "	vUv = uv;", "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
  fragmentShader: ["uniform float opacity;", "uniform sampler2D tDiffuse;", "varying vec2 vUv;", "void main() {", "	vec4 texel = texture2D( tDiffuse, vUv );", "	gl_FragColor = opacity * texel;", "}"].join("\n")
};


/***/ }),

/***/ "./node_modules/three/examples/jsm/shaders/LuminosityHighPassShader.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/LuminosityHighPassShader.js ***!
  \*****************************************************************************/
/*! exports provided: LuminosityHighPassShader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LuminosityHighPassShader", function() { return LuminosityHighPassShader; });
/* harmony import */ var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../build/three.module.js */ "./node_modules/three/build/three.module.js");
/**
 * @author bhouston / http://clara.io/
 *
 * Luminosity
 * http://en.wikipedia.org/wiki/Luminosity
 */

var LuminosityHighPassShader = {
  shaderID: "luminosityHighPass",
  uniforms: {
    "tDiffuse": {
      value: null
    },
    "luminosityThreshold": {
      value: 1.0
    },
    "smoothWidth": {
      value: 1.0
    },
    "defaultColor": {
      value: new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Color"](0x000000)
    },
    "defaultOpacity": {
      value: 0.0
    }
  },
  vertexShader: ["varying vec2 vUv;", "void main() {", "	vUv = uv;", "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
  fragmentShader: ["uniform sampler2D tDiffuse;", "uniform vec3 defaultColor;", "uniform float defaultOpacity;", "uniform float luminosityThreshold;", "uniform float smoothWidth;", "varying vec2 vUv;", "void main() {", "	vec4 texel = texture2D( tDiffuse, vUv );", "	vec3 luma = vec3( 0.299, 0.587, 0.114 );", "	float v = dot( texel.xyz, luma );", "	vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );", "	float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );", "	gl_FragColor = mix( outputColor, texel, alpha );", "}"].join("\n")
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
/* harmony import */ var three_examples_jsm_postprocessing_UnrealBloomPass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/postprocessing/UnrealBloomPass */ "./node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js");
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
  var composer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__["EffectComposer"](this.renderer);
  composer.setSize(width, height);
  var renderScene = new three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_4__["RenderPass"](scene, camera);
  composer.addPass(renderScene);
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
//# sourceMappingURL=index.js.b75f983650720d843760.hot-update.js.map