import { useEffect , useRef} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import { PageTransition } from 'next-page-transitions'
import "@babel/polyfill";

import withReduxStore from "../lib/with-redux-store";

import Target from '../components/ui/Target';
import DeviceChecker from '../components/ui/DeviceChecker';

import '../scss/index.scss';
const TIMEOUT = 400

const App = ({Component, pageProps, reduxStore }) => { 

  return (
    <>
      <CssBaseline/>
      <Provider store={reduxStore}>

      <PageTransition

          classNames="page-transition"
          loadingDelay={800}
          timeout={TIMEOUT}

        >
          <Component {...pageProps}/>
        </PageTransition>
          <Target/>
          <DeviceChecker/>
          <style jsx global>{`

            .page-transition-enter {
              opacity: 0;
              transform: translate3d(0, 40px, 10);
            }
            .page-transition-enter-active {
              opacity: 1;
              transform: translate3d(0, 0, 0);
              transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
            }
            .page-transition-exit {
              opacity: 1;
            }
            .page-transition-exit-active {
              opacity: 0;
              transition: opacity ${TIMEOUT}ms;
            }
          `}
        </style>
      </Provider>
    </>
  )
}

export default withReduxStore(App);