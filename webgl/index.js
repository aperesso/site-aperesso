import Pulse from './pulse';
import About from './about';

const WebGL = function( programName ) {
  if (programName === 'pulse') return new Pulse();
  if (programName === 'about') return new About();
  return null;
}

export default WebGL;