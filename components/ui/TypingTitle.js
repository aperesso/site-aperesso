import React, { memo , useMemo , useState, useEffect, useCallback} from "react"

import "../../scss/ui/typingtitle.scss";

const SPEED = 75

const TypingTitle = ({title, typing}) => {

    const [blinkingIndex, setBlinkingIndex] = useState(
        () => {
            if (typing) return 0
            return (title || "").split('\n').length - 1
        }
    )

    const [audio, setAudio] = useState();

    useEffect(
        () => {
            if (typing) setBlinkingIndex(0)
        } , [typing]
    )

    useEffect(
        () => {
            const sounds = new Array(5)
                .fill(null)
                .map(
                    (_, i) => new Audio(`/assets/audio/keystroke/keystroke_${i}.wav`)
                )
            setAudio(() => sounds)
        } , []
    )

    useEffect(
        () => {
            if (!typing) return;
            if (blinkingIndex > title.split("\n").length - 1) return;

            const el = document.getElementById("blinking-index");
            const text = el.textContent;
            el.textContent = "";
            
            for (let i = 0; i < text.length ; i++) {
                setTimeout(
                    () => {
                        el.textContent += text[i];
                       
                        if (audio) {
                            const key = Math.floor(Math.random() * (audio.length - 1)); 
                            audio[key].play()
                        }
                    
                        if (i === text.length - 1) {
                            if (blinkingIndex !== title.split("\n").length - 1) {
                                setBlinkingIndex(i => i + 1)
                            }
                        }
                    } , SPEED * ( i + Math.random() )
                )
            }

        } , [title, blinkingIndex, typing]
    )


    const titles = useMemo(
        () => {
            return title
                .split('\n')
                .slice(0, blinkingIndex + 1)
                .map(
                    (t, i) => (
                        <span key={i} 
                            className={i === blinkingIndex ? "blinking" : ""}
                        >
                            {i !== 0 && <br/>}
                            <span id={i === blinkingIndex ? "blinking-index" : ""}>
                                {t}
                            </span>
                        </span>
                    )
                )
        } , [title, blinkingIndex]
    )

    return(
        <h1 className="typing-title">
            {titles}
        </h1>
    )
}

export default memo(TypingTitle);