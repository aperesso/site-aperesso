const vertexShader = `
const float size = 1000.0;

attribute float radius;
attribute float longitude;
attribute float latitude;
attribute float speed;

uniform float time;
uniform float uAudioBandsBuffer[8];

varying float average;

void main() {

    float x = radius * sin(longitude ) * cos(latitude);
    float y = radius * sin(longitude) * sin(latitude);
    float z = radius * cos(longitude);

    vec3 pos = vec3(x,y,z);
   
    vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 ) ;
    gl_PointSize = size;
    gl_Position = projectionMatrix * mvPosition;
}
`

const fragmentShader = `
uniform sampler2D pointTexture;
uniform float opacity;

varying float average;
uniform float uAudioBandsBuffer[8];

void main() {

 
    vec4    tex = texture2D( pointTexture, gl_PointCoord );
    
    vec3 color = mix(
        vec3(max(uAudioBandsBuffer[0], 0.2)), 
        tex.xyz,
        0.5
    );
    gl_FragColor = opacity * vec4(color, tex.a);
}
`

export {
  vertexShader,
  fragmentShader
}