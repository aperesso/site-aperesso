import * as THREE from 'three';

import { AUDIO_SETTINGS } from './settings';

const Audio = function() {

  const listener = new THREE.AudioListener();
  const sound = new THREE.Audio(listener);

  const loadFile = async () => {
    const loader = new THREE.AudioLoader();
    return new Promise(
      resolve => {
        loader.load(`/assets/audio/${AUDIO_SETTINGS.file}`,
          buffer => resolve(buffer)
        )
      }
    )
  }

  const bufferDecrease = new Array(8).fill(0);
  const frequencyBandsBuffer = new Array(8).fill(0);
  const frequencyBands = new Array(8).fill(0);
  const audioBands = new Array(8).fill(0);
  const audioBandsBuffer = new Array(8).fill(0);
  const highestFreq = new Array(8).fill(0);

  const updateFrequencyBands = samples => {
    let count = 0;
    for (let i in frequencyBands) {
      let sampleCount = Math.pow(2, i) * 2;
      if (i === 7) sampleCount += 2;
      let average = 0;
      for (let j = 0; j < sampleCount; j++) {
        average += samples[count] * (count + 1);
        count++
      }
      frequencyBands[i] = (average / sampleCount) * 10;
    }
  }

  const updateFrequencyBandsBuffer = () => {
    for (let i in frequencyBandsBuffer) {
      if (frequencyBands[i] > frequencyBandsBuffer[i]) {
        bufferDecrease[i] = 0.005;
        frequencyBandsBuffer[i] = frequencyBands[i];
      } else {
        bufferDecrease[i] *= 1.2;
        frequencyBandsBuffer[i] -= bufferDecrease[i];
      }
    }
  }      

  const updateAudioBands = () => {
    for (let i in audioBands) {
      if (frequencyBands[i] > highestFreq[i]) {
        highestFreq[i] = frequencyBands[i]
      }
      audioBands[i] = frequencyBands[i] / (highestFreq[i] || 1);
      audioBandsBuffer[i] = frequencyBandsBuffer [i] / (highestFreq[i] || 1);
    }
  }

  this.load = async () => {
    const buffer = await loadFile();
    sound.setBuffer(buffer);
    sound.setLoop(true);
    this.analyzer = new THREE.AudioAnalyser(sound, AUDIO_SETTINGS.ftSize)
  }

  this.isPlaying = false;
  
  this.stop = () => {
    this.isPlaying = false;
    if (sound.isPlaying) sound.pause(); 
  }

  this.play = async () => {
    // if (!sound) await this.load()
    this.isPlaying = true;
    if (!sound.isPlaying) sound.play();
  }

  this.update = () => {
    const samples = this.analyzer.getFrequencyData();
    updateFrequencyBands(samples);
    updateFrequencyBandsBuffer();
    updateAudioBands()
  }

  this.getAudioBandsBuffer = () => audioBandsBuffer;

}

export default Audio;