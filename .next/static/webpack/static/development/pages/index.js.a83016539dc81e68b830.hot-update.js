webpackHotUpdate("static/development/pages/index.js",{

/***/ "./webgl/shaders/particles.js":
/*!************************************!*\
  !*** ./webgl/shaders/particles.js ***!
  \************************************/
/*! exports provided: vertexShader, fragmentShader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vertexShader", function() { return vertexShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fragmentShader", function() { return fragmentShader; });
var vertexShader = "\nconst float size = 1000.0;\n\nattribute float radius;\nattribute float longitude;\nattribute float latitude;\nattribute float speed;\n\nuniform float time;\nuniform float uAudioBandsBuffer[8];\n\nvarying float average;\n\nvoid main() {\n\n    float x = radius * sin(longitude ) * cos(latitude);\n    float y = radius * sin(longitude) * sin(latitude);\n    float z = radius * cos(longitude) - 10.;\n\n    vec3 pos = vec3(x,y,z);\n   \n    vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 ) ;\n    gl_PointSize = size;\n    gl_Position = projectionMatrix * mvPosition;\n}\n";
var fragmentShader = "\nuniform sampler2D pointTexture;\nuniform float opacity;\n\nvarying float average;\nuniform float uAudioBandsBuffer[8];\n\nvoid main() {\n\n \n    vec4    tex = texture2D( pointTexture, gl_PointCoord );\n    float music = (uAudioBandsBuffer[0] + uAudioBandsBuffer[1] + uAudioBandsBuffer[2]) / 3.;\n    vec3 color = mix(\n        vec3(max(music, 0.2)), \n        tex.xyz,\n        0.5\n    );\n    gl_FragColor = opacity * vec4(color, tex.a);\n}\n";


/***/ })

})
//# sourceMappingURL=index.js.a83016539dc81e68b830.hot-update.js.map