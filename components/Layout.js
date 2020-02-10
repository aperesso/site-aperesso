import React, { useEffect , memo } from 'react';

import Header from './Header';
import GA from '../lib/gtm';
import '../scss/index.scss';

const Layout = props => {
    useEffect(
        () => {
            if (!window.GA_INITIALIZED) {
                GA.initGA()
                window.GA_INITIALIZED = true
              }
              GA.logPageView()
        } , []
    )

    return (
        <div className="layout">
            <Header/>
            <div className={props.page || ""}>
                {props.children}
            </div>
        </div>
    )
}

export default memo(Layout);