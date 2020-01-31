
const vertexShader = `
  vec3 v0 = position;

  vec3 bitangent = cross(normal, tangent);
  vec3 v1 = v0 + (tangent * 0.01);
  vec3 v2 = v0 + (bitangent * 0.01);

  averageAudio = (uAudioBandsBuffer[0] + uAudioBandsBuffer[1] + uAudioBandsBuffer[2] + uAudioBandsBuffer[3] +
    uAudioBandsBuffer[4] + uAudioBandsBuffer[5] + uAudioBandsBuffer[6] + uAudioBandsBuffer[7]) / 8.0;

  float noiseScale = 2.0 * averageAudio;
  float noiseFrequency = 0.5 * averageAudio;

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
  vec3 newDiffuse = max(averageAudio , 0.2)  * diffuse;
  vec4 diffuseColor = vec4( newDiffuse, opacity );
`

export {
  vertexShader,
  fragmentShader
}