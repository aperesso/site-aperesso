import { useEffect , useRef} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import "@babel/polyfill";

import withReduxStore from "../lib/with-redux-store";

import Target from '../components/ui/Target';

import '../scss/index.scss';

const App = ({Component, pageProps, reduxStore }) => { 

  const coord = useRef({x : 0, y : 0})

  const mouseMove = event => {
    const targetIcon = document.getElementById('target-icon');

    coord.current.x++;
    coord.current.y++;
}

  useEffect(
    () => {
        // const target = document.getElementById('target');
        // const { width , height } = target.getBoundingClientRect();
      

        window.addEventListener("mousemove", mouseMove);
        return(
            () => {
                window.removeEventListener("mousemove", mouseMove);
            }
        )
    } , [] 
  )

  return (
    <>
      <CssBaseline/>
      <Provider store={reduxStore}>
        <Component {...pageProps}/>
        <Target coord={coord.current}/>
      </Provider>
    </>
  )
}

export default withReduxStore(App);