  
import React , { useMemo , memo , useState , useEffect , useCallback } from 'react';
import { Stage , AnimatedSprite , Container , withFilters } from '@inlet/react-pixi'
import {GlitchFilter} from '@pixi/filter-glitch';
import * as PIXI from 'pixi.js';

import '../../scss/ui/animated-gif.scss';

const AnimatedGif = memo(
    ({texture, size}) => (
        <Container x={size.width / 2} y={size.height / 2}>
            <AnimatedSprite
                textures={texture}
                anchor={0.5}
            />
        </Container>
    )
)

const Filters = withFilters(Container, [
    GlitchFilter
])

const AnimatedGifStage = ({gif, size}) => {

    const [shouldRender, setShouldRender ] = useState(false)

    useEffect(
        () => {
            if (gif) { setShouldRender(true) }
        } , [gif, setShouldRender]
    )

    const texture = useMemo(
        () => {
            if (!gif) return ;
            const video = document.createElement("video");
            video.preload = "auto";
            video.loop = true;
            video.src = `/assets/gifs/${gif}.mp4`;
            
            const videoTex = PIXI.Texture.from(video);
            return [videoTex]
        } , [gif]
    )

    const onAnimationEnd = useCallback(
        () => {
            if (!gif) setShouldRender(false)
        }, 
        [gif, setShouldRender]
    )

    if (!shouldRender) return null;

    return (
        <div 
            className="stage"
            style={{animation : `${gif ? 'fadeIn' : 'fadeOut'} 0.5s`}}
            onAnimationEnd={onAnimationEnd}  
        >
            <Stage 
                className="stage-canvas"
                width={size.width}
                height={size.height}
            >
                <Filters
                    glitchFilter={{animated: true}}
                >
                    <AnimatedGif texture={texture} size={size}/>
                </Filters>
            </Stage> 
        </div>
        
    )
    
}

export default memo(AnimatedGifStage);