import React , { memo , useEffect } from 'react';
import Sketch from "react-p5";

const WIDTH = 500;
const HEIGHT = 180;

const PixiText = ({string}) => {

    let x = WIDTH/2;
    let y = HEIGHT/2;

    let xSpeed = 0.6;
    let ySpeed = 0.8;

    let widthText;
    let heightText;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
        p5.textSize(48);
        p5.stroke(220);
        p5.textAlign(p5.CENTER);

        widthText = p5.textWidth(string.toUpperCase()) + 2 * 12;
        heightText = 45 + 2 * 10;
        console.log({widthText,  heightText});

    };
    
    const draw = p5 => {
        p5.background(5);

        for (let i = 0 ; i < 10; i++) {
            if (i === 0) p5.fill(100);
            p5.text(string.toUpperCase(), x + (2 * i ), y + (2 * i));
        }
        
        if (x < widthText / 2 || x > WIDTH - (widthText / 2)) {
            xSpeed *= -1;
        }

        if (y < heightText / 2 || y > HEIGHT - (heightText / 2)) {
            ySpeed *= -1;
        }

        x += xSpeed;
        y += ySpeed;
    }

    return (
       <Sketch setup={setup} draw={draw} />
    )

}

export default memo(PixiText);