import { useEffect , useState , useCallback } from "react";

import Layout from '../components/Layout';
import Loader from '../components/ui/Loader';
import AudioController from '../components/ui/AudioController';

import WebGL from '../webgl';

import '../scss/homepage.scss';

const Index = () => {

  const [webGL, setWebGL ] = useState(null);

  useEffect(
    () => {
      // const onResize = () => {
      //   if (!webGL) return ;
      //   webGL.onResize();
      // }
      // if (!webGL) {
      //   const GL = new WebGL();
      //   GL.load()
      //   .then(
      //     async () => {
      //         await setWebGL(() => GL);
      //   }).then(() => GL.render())
      // }
      // window.addEventListener('resize', onResize)
      // return (() => {
      //   window.removeEventListener('resize', onResize)
      // })
    }, [webGL]
  );


  const onChangeFullscreen = useCallback(
    () => {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
          document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
          document.documentElement.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
          document.msExitFullscreen();
        }
      }
    } , []
  )

  return(
    <Layout page='homepage'>
      {
        //<Loader show={!webGL}/>
      }
      <div className='webGL-canvas' id="webGL-wrapper">
        {
          <canvas id='webGL'/>
        }
        <h1 className='homepage-title'>
          Hello I am Alexia Peresson  <br/>
          a Freelance Front-End Developer
          <span className="blinking-cursor">|</span>
        </h1>
        <div className="homepage-controllers">
          <AudioController/>
          <button className="no-btn homepage--fullsize" onClick={onChangeFullscreen} >
            <img src='/assets/image/expand.svg'/>
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Index;