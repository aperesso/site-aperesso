
const vertexShader = `
  vec3 v0 = position;

  vec3 bitangent = cross(normal, tangent);
  vec3 v1 = v0 + (tangent * 0.01);
  vec3 v2 = v0 + (bitangent * 0.01);

  averageAudio = (uAudioBandsBuffer[0] + uAudioBandsBuffer[1] + uAudioBandsBuffer[2] + uAudioBandsBuffer[3] +
    uAudioBandsBuffer[4] + uAudioBandsBuffer[5] + uAudioBandsBuffer[6] + uAudioBandsBuffer[7]) / 8.0;


  float scale = (uAudioBandsBuffer[0] + uAudioBandsBuffer[1]) / 2.0 ;
  float noiseScale = 4.0 * averageAudio ;
  float noiseFrequency = 0.3 * averageAudio;

  float ns0 =  noiseScale *  snoise(vec3(v0.x + uNoiseOffset.x, v0.y + uNoiseOffset.y, v0.z + uNoiseOffset.z) * noiseFrequency );
  v0 += ((ns0 - 1.)/2.) * normal;

  float ns1 = noiseScale *  snoise(vec3(v1.x + uNoiseOffset.x, v1.y + uNoiseOffset.y, v1.z + uNoiseOffset.z) * noiseFrequency );
  v1 += ((ns1 - 1.)/2.) * normal;

  float ns2 =  noiseScale * snoise(vec3(v2.x + uNoiseOffset.x, v2.y + uNoiseOffset.y, v2.z + uNoiseOffset.z) * noiseFrequency );
  v2+= ((ns2 - 1.)/2.) * normal;

  vec3 vn = cross(v2- v0, v1 - v0);
  vNormal = normalize(-vn);

  vec3 transformed = vec3(v0);
`

const fragmentShader = `
  float basses = uAudioBandsBuffer[6] + uAudioBandsBuffer[7];

  float a = (uAudioBandsBuffer[0] + uAudioBandsBuffer[1] + uAudioBandsBuffer[2]) / 3.;
  float b = (uAudioBandsBuffer[3] + uAudioBandsBuffer[4] + uAudioBandsBuffer[5]) / 3.;
  float c = (uAudioBandsBuffer[6] + uAudioBandsBuffer[7]) / 2.;

  vec3 diffuse = 0.3 + 0.1 * vec3(a,b,c);

  // if (a > b && a > c) {
  //   diffuse.r = 0.3;
  // } else if ( b > a && b > c) {
  //   diffuse.g = 0.3;
  // } else {
  //   diffuse.b = 0.3;
  // }
  vec3 newDiffuse = max(a / 3., 0.3)  * diffuse;
  vec4 diffuseColor = vec4( diffuse, opacity );
`

export {
  vertexShader,
  fragmentShader
}