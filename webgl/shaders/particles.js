const vertexShader = `
precision highp float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float time;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform float uAudioBandsBuffer[8];

attribute vec3 position;
attribute vec2 uv;
attribute vec3 translate;
attribute float longitude;
attribute float indice;

varying vec2 vUv;
varying vec3 vColor;

const float PI = 3.1415926535897932384626433832795;


float rand(float n){return fract(sin(n) * 43758.5453123);}

float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

mat4 rotationX( in float angle ) {
	return mat4(	1.0,		0,			0,			0,
			 		0, 	cos(angle),	-sin(angle),		0,
					0, 	sin(angle),	 cos(angle),		0,
					0, 			0,			  0, 		1);
}

mat4 rotationY( in float angle ) {
	return mat4(	cos(angle),		0,		sin(angle),	0,
			 				0,		1.0,			 0,	0,
					-sin(angle),	0,		cos(angle),	0,
							0, 		0,				0,	1);
}

mat4 rotationZ( in float angle ) {
	return mat4(	cos(angle),		-sin(angle),	0,	0,
			 		sin(angle),		cos(angle),		0,	0,
							0,				0,		1,	0,
							0,				0,		0,	1);
}

void main() {

	vec3 pos = translate;
	// pos += vec3(sin(time * 0.2) * noise(translate) * 10.);
  
	vec4 mvPosition = viewMatrix
		* modelMatrix 
		* vec4( pos, 1.0 );

	vec4 rotatePos = rotationZ(cos(time * longitude * 0.3))
		* vec4(position, 1.0);

	mvPosition.xyz += (abs(cos(time * 0.02 * longitude) * 1.5) + 1.0) * rotatePos.xyz ;
    
    highp int index = int(indice);
    float gr = uAudioBandsBuffer[index];
    vColor = vec3( gr);
	vUv = uv;
	gl_Position = projectionMatrix * mvPosition;
}
`

const fragmentShader = `
precision highp float;
uniform sampler2D texture;
varying vec2 vUv;
varying float vScale;
varying vec3 vColor;
uniform float uAudioBandsBuffer[8];


void main() {

    float a = (uAudioBandsBuffer[0] + uAudioBandsBuffer[1] + uAudioBandsBuffer[2]) / 3.;
    float b = (uAudioBandsBuffer[3] + uAudioBandsBuffer[4] + uAudioBandsBuffer[5]) / 3.;
    float c = (uAudioBandsBuffer[6] + uAudioBandsBuffer[7]) / 2.;
  
    vec3 diffuse = vec3(0.8) +  0.5 * vec3(a,b,c);

    vec4 tex = texture2D(texture, vUv);
    vec3 color = mix(tex.rgb, diffuse, 0.5);
    gl_FragColor = .2 * vec4(color, tex.a);
}
`

export {
  vertexShader,
  fragmentShader
}