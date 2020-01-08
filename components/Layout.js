import React, { useEffect , memo } from 'react';

import Header from './Header';

import { useSelector } from '../lib/useRedux';


import '../scss/index.scss';

const Layout = props => {

    const [ audio ] = useSelector(state => [
        state.audio
    ]);
   

    useEffect(
        () => {

        }
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