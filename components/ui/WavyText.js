import React, { memo , useEffect } from 'react';

import '../../scss/ui/wavy-text.scss'

const WavyText = ({
    text
}) => {

    useEffect(() => {
        const canvas = document.getElementById('wavy-text-canvas');
        const ctx = canvas.getContext('2d');

        ctx.font = "30px";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";

        ctx.fillText("Hello World", canvas.width/2, canvas.height/2);
    }, [])


    return (
        <div className="wavy-text">
            <canvas id="wavy-text-canvas"/>
        </div>
    )
}

export default memo(WavyText);