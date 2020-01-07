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
var vertexShader = "\nprecision highp float;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float time;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform float uAudioBandsBuffer[8];\n\nattribute vec3 position;\nattribute vec2 uv;\nattribute vec3 translate;\nattribute float longitude;\nattribute float indice;\n\nvarying vec2 vUv;\nvarying vec3 vColor;\n\nconst float PI = 3.1415926535897932384626433832795;\n\n\nfloat rand(float n){return fract(sin(n) * 43758.5453123);}\n\nfloat mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}\nvec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}\nvec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}\n\nfloat noise(vec3 p){\n    vec3 a = floor(p);\n    vec3 d = p - a;\n    d = d * d * (3.0 - 2.0 * d);\n\n    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);\n    vec4 k1 = perm(b.xyxy);\n    vec4 k2 = perm(k1.xyxy + b.zzww);\n\n    vec4 c = k2 + a.zzzz;\n    vec4 k3 = perm(c);\n    vec4 k4 = perm(c + 1.0);\n\n    vec4 o1 = fract(k3 * (1.0 / 41.0));\n    vec4 o2 = fract(k4 * (1.0 / 41.0));\n\n    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);\n    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);\n\n    return o4.y * d.y + o4.x * (1.0 - d.y);\n}\n\nmat4 rotationX( in float angle ) {\n\treturn mat4(\t1.0,\t\t0,\t\t\t0,\t\t\t0,\n\t\t\t \t\t0, \tcos(angle),\t-sin(angle),\t\t0,\n\t\t\t\t\t0, \tsin(angle),\t cos(angle),\t\t0,\n\t\t\t\t\t0, \t\t\t0,\t\t\t  0, \t\t1);\n}\n\nmat4 rotationY( in float angle ) {\n\treturn mat4(\tcos(angle),\t\t0,\t\tsin(angle),\t0,\n\t\t\t \t\t\t\t0,\t\t1.0,\t\t\t 0,\t0,\n\t\t\t\t\t-sin(angle),\t0,\t\tcos(angle),\t0,\n\t\t\t\t\t\t\t0, \t\t0,\t\t\t\t0,\t1);\n}\n\nmat4 rotationZ( in float angle ) {\n\treturn mat4(\tcos(angle),\t\t-sin(angle),\t0,\t0,\n\t\t\t \t\tsin(angle),\t\tcos(angle),\t\t0,\t0,\n\t\t\t\t\t\t\t0,\t\t\t\t0,\t\t1,\t0,\n\t\t\t\t\t\t\t0,\t\t\t\t0,\t\t0,\t1);\n}\n\nvoid main() {\n\n\tvec3 pos = translate;\n\tpos += vec3(sin(time * 0.2) * noise(translate) * 10.);\n  \n\tvec4 mvPosition = viewMatrix \t\n\t\t* modelMatrix \n\t\t* vec4( pos, 1.0 );\n\n\tvec4 rotatePos = rotationZ(cos(time * longitude * 0.3))\n\t\t* vec4(position, 1.0);\n\n\tmvPosition.xyz += (abs(cos(time * 0.02 * longitude) * 1.5) + 1.0) * rotatePos.xyz ;\n\t\n    vColor = vec3(indice/8.0);\n\tvUv = uv;\n\tgl_Position = projectionMatrix * mvPosition;\n}\n";
var fragmentShader = "\nprecision highp float;\nuniform sampler2D texture;\nvarying vec2 vUv;\nvarying float vScale;\nvarying vec3 vColor;\n\nvoid main() {\n\n    vec4 tex = texture2D(texture, vUv);\n    vec3 color = mix(tex.rgb, vColor, 0.5);\n    gl_FragColor = vec4(color, tex.a);\n    // gl_FragColor = vec4(vUv, 0.0, 1.0);\n}\n";


/***/ })

})
//# sourceMappingURL=index.js.592e9f69c1577ab1e55c.hot-update.js.map