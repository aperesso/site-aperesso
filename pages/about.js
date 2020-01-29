import { useEffect , useState , useCallback } from 'react';
import dynamic from 'next/dynamic'

import Layout from '../components/Layout';
import WebGL from '../webgl';

import '../scss/about.scss'

const AnimatedGif = dynamic(() => import('../components/ui/AnimatedGif'), {ssr: false});

const About = () => {

    const [onResize, setOnResize] = useState();
    const [webGL, setWebGL] = useState();
    const [displayGif, setDisplayedGif] = useState();
    const [size, setSize] = useState();

    useEffect(
        () => {
            if (!webGL) {
                const GL = new WebGL('about');
                GL.load()
                    .then(
                        () => {
                            GL.render();
                            setOnResize(() => GL.onResize);
                            setWebGL(() => GL)
                        }
                    )
            }
        } , [webGL]
    )

    const getSize = useCallback(
        () => {
            const el = document.getElementById('presentation');
            const { width , height } = el.getBoundingClientRect();
            setSize(() => ({width, height}))
        } , []
    )

    useEffect(
        () => {
            getSize();
            window.addEventListener('resize', getSize)
            return (
                () => window.removeEventListener('resize', getSize)
            )
        } , []
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

  
    const onMouseLeave = useCallback(
        () => setDisplayedGif('') , [setDisplayedGif]
    )

    const onHelloEnter = useCallback(
        () => setDisplayedGif('hello') , [setDisplayedGif]
    )
    const on2020Enter  = useCallback(
        () => setDisplayedGif('2020') , [setDisplayedGif]
    )

    const onExcitedEnter = useCallback(
        () => setDisplayedGif('excited') , [setDisplayedGif]
    )


    return (
        <Layout page='about'>
            <div className='flex-wrapper'>
                <div className='webGL-canvas' id="webGL-wrapper">
                    <canvas id='webGL'/>
                </div>
                <div className="presentation-wrapper">
                    <AnimatedGif gif={displayGif} size={size}/>
                    <div className="presentation" id="presentation">
                        <h1 
                            onMouseEnter={onHelloEnter}
                            onMouseLeave={onMouseLeave}
                            onTouchStart={onHelloEnter}
                            onTouchEnd={onMouseLeave}
                        >
                            Oh, <span>hello there</span>.
                        </h1>
                        <p>I am a creative frontend freelancer who believes in strong and bold digital experiences. I like to craft code that is sweet to your eyes. I am passionate about building stories through visual WebGL experiments. My current aim is to work with top-notch brands and agencies on captivating projects.</p>
                        <p>
                            <span 
                                onMouseEnter={on2020Enter} 
                                onMouseLeave={onMouseLeave}
                                onTouchStart={on2020Enter}
                                onTouchEnd={onMouseLeave}
                            > 2020 
                            </span> is a very particular year for me so far. I have decided to quit my job for the sake of following my dreams of freelancing. My position as a software developer in a Parisian tech startup company helped me learn a ton about what is the correct way to handle large schemes and architectures.  I would not be the developer I am today without the knowledge I inherited from some of the very gifted souls working there. I could not be more excited to use those skills for you now!</p>
                        <p>
                            If you want to know more or you are interested in working together,
                             make sure to drop a line. <span 
                                onMouseEnter={onExcitedEnter} 
                                onMouseLeave={onMouseLeave}
                                onTouchStart={onExcitedEnter}
                                onTouchEnd={onMouseLeave}
                            >
                                I am already thrilled.
                            </span>
                        </p>   
                    </div>
                </div>
            </div>
            <div className="pixi-text-wrapper">
                <button>
                    DROP A LINE
                </button>  
            </div>
        </Layout>
    )
}

export default About;