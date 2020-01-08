import { useEffect , useState } from "react";

import Layout from '../components/Layout';
import Loader from '../components/Loader';

import WebGL from '../webgl';

import '../scss/homepage.scss';

const Index = () => {

  const [webGL, setWebGL ] = useState();

  useEffect(
    () => {
      const onResize = () => {
        if (!webGL) return ;
        webGL.onResize();
      }
      if (!webGL) {
        const GL = new WebGL();
        GL.load().then(
          () => {
            GL.render();
            setWebGL(() => GL);
        })
      }
      window.addEventListener('resize', onResize)
      return (() => {
        window.removeEventListener('resize', onResize)
      })
    }, [webGL]
  );

  return(
    <Layout page='homepage'>
      {
        !webGL && <Loader/>
      }
      <div className='webGL-canvas' id="webGL-wrapper">
        <canvas id='webGL'/>
        <h1 className='homepage-title'>
          Hello I am Alexia Peresson  <br/>
          a Freelance Front-End Developer
          <span className="blinking-cursor">|</span>
        </h1>
      </div>
    </Layout>
  )
}

export default Index;