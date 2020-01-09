import { useEffect , useState , useCallback , useMemo } from "react";

import Layout from '../components/Layout';
import Loader from '../components/ui/Loader';
import AudioController from '../components/ui/AudioController';
import WebGL from '../webgl';
import { loadWebGL } from '../reducers';
import { useSelector, useDispatch } from "../lib/useRedux";

import '../scss/homepage.scss';



const Index = () => {

  const [webGL, setWebGL] = useState(false);
  const [audio, setAudio] = useState({});

  useEffect(
    () => {
       if (!webGL) {
          const GL = new WebGL();
          GL.load().then(() => {
            setWebGL(true);
            setAudio(() => GL.audio);
          }).then(() => GL.render());
       }
        return (
          () => {
            if (webGL && audio.stop) {
              audio.stop();
            }
          }
        )
    } , 
    [webGL, audio]
  )

  useEffect(
    () => {
      if (audio.isPlaying) {
        audio.play()
      } else if (audio.stop) {
        audio.stop()
      }
    } , [audio.isPlaying, audio.stop]
  )

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


  const onStart = useCallback(() => {
      setAudio(audio => ({
        ...audio,
        isPlaying: true,
      }))
    } , []
  )

  const onPause = useCallback(
    () => {
      setAudio(audio => ({
        ...audio,
        isPlaying: false,
      }))
    } , []
  )


  return(
    <Layout page='homepage'>
      {
        <Loader loading={!webGL} onStart={onStart}/>
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
       { 
          webGL && (
            <div className="homepage-controllers">
              <AudioController isPlaying={audio.isPlaying} onStart={onStart} onPause={onPause}/>
              <button className="no-btn homepage--fullsize" onClick={onChangeFullscreen} >
                <img src='/assets/image/expand.svg'/>
              </button>
            </div>
          )
        }
      </div>
    </Layout>
  )
}

export default Index;