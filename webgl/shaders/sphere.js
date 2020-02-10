
const vertexShader = `
  vec3 v0 = position;

  vec3 bitangent = cross(normal, tangent);
  vec3 v1 = v0 + (tangent * 0.01);
  vec3 v2 = v0 + (bitangent * 0.01);

  averageAudio = (uAudioBandsBuffer[0] + uAudioBandsBuffer[1] + uAudioBandsBuffer[2] + uAudioBandsBuffer[3] +
    uAudioBandsBuffer[4] + uAudioBandsBuffer[5] + uAudioBandsBuffer[6] + uAudioBandsBuffer[7]) / 8.0;


  vec3 noiseOffset = vec3(
      abs(cos(
        uTime
      ))
    );

  noiseOffset.x *=  5. * (uAudioBandsBuffer[0] + uAudioBandsBuffer[1] + uAudioBandsBuffer[2]) / 3. ;
  noiseOffset.y *=  5. * (uAudioBandsBuffer[3] + uAudioBandsBuffer[4]) / 2. ;
  noiseOffset.z *=  5. * (uAudioBandsBuffer[5] + uAudioBandsBuffer[6] + uAudioBandsBuffer[7]) / 2. ;

  // float scale = averageAudio ;
  float noiseScale = 3. * averageAudio + 2.0 ;
  float noiseFrequency = 0.3 * averageAudio; 

  float ns0 =  noiseScale *  snoise(vec3(v0.x + noiseOffset.x, v0.y + noiseOffset.y, v0.z + noiseOffset.z) * noiseFrequency );
  v0 += ((ns0 - 1.)/2.) * normal;

  float ns1 = noiseScale *  snoise(vec3(v1.x + noiseOffset.x, v1.y + noiseOffset.y, v1.z + noiseOffset.z) * noiseFrequency );
  v1 += ((ns1 - 1.)/2.) * normal;

  float ns2 =  noiseScale * snoise(vec3(v2.x + noiseOffset.x, v2.y + noiseOffset.y, v2.z + noiseOffset.z) * noiseFrequency );
  v2+= ((ns2 - 1.)/2.) * normal;

  vec3 vn = cross(v2- v0, v1 - v0);
  vNormal = normalize(-vn);

  vec3 transformed = vec3(v0);
`

const fragmentShader = `
  float basses = uAudioBandsBuffer[6] + uAudioBandsBuffer[7];
  float averageAudio = (uAudioBandsBuffer[0] + uAudioBandsBuffer[1] + uAudioBandsBuffer[2] + uAudioBandsBuffer[3] +
    uAudioBandsBuffer[4] + uAudioBandsBuffer[5] + uAudioBandsBuffer[6] + uAudioBandsBuffer[7]) / 8.0;

  float a = (uAudioBandsBuffer[0] + uAudioBandsBuffer[1] + uAudioBandsBuffer[2]) / 3.;
  float b = (uAudioBandsBuffer[3] + uAudioBandsBuffer[4] + uAudioBandsBuffer[5]) / 3.;
  float c = (uAudioBandsBuffer[6] + uAudioBandsBuffer[7]) / 2.;

  vec3 diffuse = vec3(0.1) + vec3( a * 0.1 , b * 0.05, c * 0.1 );

  vec4 diffuseColor = vec4(diffuse, opacity );
`

export {
  vertexShader,
  fragmentShader
}