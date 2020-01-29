import { useEffect , useState , useCallback } from "react";

import Layout from '../components/Layout';
import Loader from '../components/ui/Loader';
import AudioController from '../components/ui/AudioController';
import TypingTitle from "../components/ui/TypingTitle";

import WebGL from '../webgl';
import lexicon from '../lexicon';

import '../scss/homepage.scss';


const Index = () => {

  const [webGL, setWebGL] = useState(false);
  const [audio, setAudio] = useState({});
  const [onResize, setOnResize] = useState();
  const [animateTyping, setAnimateTyping] = useState(false);

  useEffect(
    () => {

      if (!webGL) {
          const GL = new WebGL('pulse');
          GL.load()
            .then(
              () => {
                setWebGL(true);
                setAudio(() => GL.audio);
                setOnResize(() => GL.onResize);
                GL.render();
              }
            )
      }

      return (
        () => {
          if (webGL && audio.stop) audio.stop();
        }
      )
    } , 
    [webGL, audio]
  )

  useEffect(
    () => {
      if (audio.isPlaying)  audio.play()
      else if (audio.stop)  audio.stop()
    } , [audio.isPlaying, audio.stop]
  )

  useEffect(
    () => {
      if (!onResize) return;
      window.addEventListener('resize', onResize)
      return (
        () => {
          if (!onResize) return;
          window.removeEventListener('resize', onResize)
        }
      )
    } , [onResize]
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


  const onAnimationStart = useCallback(() => {
    onStart();
    setAnimateTyping(true);
    
  }, [onStart])

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
      <Loader loading={!webGL} onStart={onAnimationStart}/>
      <div className='webGL-canvas' id="webGL-wrapper">
        <canvas id='webGL'/>
        <TypingTitle title={lexicon.title} typing={animateTyping}/>
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