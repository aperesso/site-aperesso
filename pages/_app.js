import { useEffect , useRef} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import "@babel/polyfill";

import withReduxStore from "../lib/with-redux-store";

import Target from '../components/ui/Target';

import '../scss/index.scss';

const App = ({Component, pageProps, reduxStore }) => { 

 
  return (
    <>
      <CssBaseline/>
      <Provider store={reduxStore}>
        <Component {...pageProps}/>
        <Target/>
      </Provider>
    </>
  )
}

export default withReduxStore(App);