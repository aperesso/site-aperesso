import React , { memo , useCallback, useRef , useState, useEffect } from 'react';
import Sketch from "react-p5";

import { useSelector } from '../../lib/useRedux';

const stroke = 4;
const DEFAULT_STROKE_WIDTH = 4;
const MOBILE_STROKE_WIDTH = 4;
const DEFAULT_FONT_SIZE = 100; 
const MOBILE_FONT_SIZE = 60; 

const SteeringText = ({text}) => {

    const device = useSelector(({device}) => device);

    const ref = useRef();
    const deviceRef = useRef(device);

    const [font, setFont] = useState();
    const [points, setPoints] = useState();

    const [drawingParams, setDrawingParams] = useState({
        stroke : device === 'mobile' ? MOBILE_STROKE_WIDTH : DEFAULT_STROKE_WIDTH,
        size : device === 'mobile' ? MOBILE_FONT_SIZE : DEFAULT_FONT_SIZE
    })

    useEffect(
        () => {
            if (deviceRef.current !== device) {
                deviceRef.current = device;
                setDrawingParams(() => (
                    {
                        stroke : device === 'mobile' ? MOBILE_STROKE_WIDTH : DEFAULT_STROKE_WIDTH,
                        size : device === 'mobile' ? MOBILE_FONT_SIZE : DEFAULT_FONT_SIZE
                    }
                ))
            }
        }, [device, setDrawingParams]
    )


    
    const preload = useCallback(p5 => {
        setFont(() => p5.loadFont('/assets/font/RobotoMono-Regular.ttf'));
    }, [])

    const setup = useCallback((p5, canvasParentRef) => {
        ref.current = canvasParentRef.parentNode;
        const { width , height } = ref.current.getBoundingClientRect(); 
        p5.createCanvas(width, height).parent(canvasParentRef);


        p5.textFont(font);
        p5.textSize(drawingParams.size);
        const textWidth = p5.textWidth(text);
        const textPoints = font.textToPoints(text, width / 2 - textWidth / 2, height / 2 + drawingParams.stroke / 2)

        const Vehicle = function(x,y) {
            this.pos = p5.createVector(Math.random() * width , Math.random() * height );
            this.vel = p5.createVector(Math.random() * 2 - 1 , Math.random() * 2 - 1);
            this.acc = p5.createVector();
            this.target = p5.createVector(x,y);
            this.maxSpeed = 10;
            this.maxForce = 0.6;
        }

        Vehicle.prototype.arrive = function(target) {
            const desired = p5.createVector(
                target.x - this.pos.x,
                target.y - this.pos.y
            );
            const d = desired.mag();

            const getSpeed = () => {
                if (d < 100) {
                    return p5.map(d, 0, 100, 0, this.maxSpeed);
                }
                return this.maxSpeed;
            }

            const speed = getSpeed();

            desired.setMag(speed);
             
            const steer = p5.createVector(
                desired.x -  this.vel.x,
                desired.y - this.vel.y
            );
            steer.limit(this.maxForce);
            return steer;
        }

        Vehicle.prototype.flee = function(target) {
            const desired = p5.createVector(
                target.x - this.pos.x,
                target.y - this.pos.y
            );
            const d = desired.mag();
            if (d < 100) {
                desired.setMag(this.maxSpeed);
                desired.mult(-1);
                const steer = p5.createVector(
                    desired.x -  this.vel.x,
                    desired.y - this.vel.y
                );
                steer.limit(this.maxForce);
                return steer;
            }
            return p5.createVector()
        }

        Vehicle.prototype.applyForce = function(force) {
            this.acc.add(force);
        }

        Vehicle.prototype.behaviors = function() {
            const arrive = this.arrive(this.target);
            this.applyForce(arrive);

            const mouse = p5.createVector(p5.mouseX, p5.mouseY);
            const flee = this.flee(mouse);
            this.applyForce(flee);
        }

        Vehicle.prototype.update = function() {
            this.pos.add(this.vel);
            this.vel.add(this.acc);
            this.acc.mult(0);
        }

        Vehicle.prototype.draw = function() {
            p5.point(this.pos.x, this.pos.y)
        }

        const vehicles = new Array(textPoints.length).fill(null).map(
            (_, i) => new Vehicle(textPoints[i].x, textPoints[i].y)
        )

        setPoints(vehicles);
    }, [font, points, text, drawingParams]);
    
    const draw = useCallback(p5 => {
        p5.background(5);
        p5.stroke(255);
        p5.strokeWeight(stroke);

        points.forEach(point => {
            point.behaviors();
            point.update();
            point.draw();
        })

    }, [points]);

    const onResize = useCallback(p5 => {
        if (!ref.current) return ;
        const { width , height } = ref.current.getBoundingClientRect(); 
        p5.resizeCanvas(width, height);

        p5.textFont(font);
        p5.textSize(drawingParams.size);
        const textWidth = p5.textWidth(text);
        const textPoints = font.textToPoints(text, width / 2 - textWidth / 2, height / 2 + drawingParams.stroke / 2)

        points.forEach((point, i) => {
            point.target.x = textPoints[i].x;
            point.target.y = textPoints[i].y;
        })
    }, [points, drawingParams]);


    return (
       <Sketch preload={preload} setup={setup} draw={draw} windowResized={onResize} key={`${text}-${device}`}/>
    )

}

export default memo(SteeringText);