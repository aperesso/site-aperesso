import React, { useEffect } from 'react';

import Header from './Header';

import Target from '../icons/target.svg';

import '../scss/index.scss';

const Layout = props => {
   
    useEffect(
        () => {
            const target = document.getElementById('target');
            const { width , height } = target.getBoundingClientRect();

            const mouseMove = event => {
                target.style.left = event.clientX - width / 2;
                target.style.top = event.clientY - height / 2;
            }

            window.addEventListener("mousemove", mouseMove);
            return(
                () => {
                    window.removeEventListener("mousemove", mouseMove);
                }
            )
        } , []
    )


    return (
        <div className="layout">
            <Header/>
            <div className={props.page || ""}>
                {props.children}
            </div>
            <Target id="target" className="target"/>
        </div>
    )
}

export default Layout;