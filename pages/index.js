import { useEffect } from "react";

import WebGL from '../webgl';

const Index = () => {
  useEffect(
    () => {
      // const gl = new WebGL();
      // gl.load().then(() => gl.render())
    }, 
  );

  return(
    <canvas id="webGL" style={{
      width: '100vw',
      height: '100vh',
      background: 'black',
      overflow: 'hidden',
      color: 'white'
    }}/>
  )
}

export default Index;