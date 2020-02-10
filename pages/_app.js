import { useEffect , useRef} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import { PageTransition } from 'next-page-transitions'
import "@babel/polyfill";
import Head from 'next/head';

import withReduxStore from "../lib/with-redux-store";

import Target from '../components/ui/Target';
import DeviceChecker from '../components/ui/DeviceChecker';

import '../scss/index.scss';
const TIMEOUT = 400

const App = ({Component, pageProps, reduxStore, router }) => { 
  return ( 
    <>
      <Head>
        <title>Alexia Peresson </title>
      </Head>
      <CssBaseline/>
      <Provider store={reduxStore}>

      <PageTransition

          classNames="page-transition"
          loadingDelay={800}
          timeout={TIMEOUT}

        >
          <Component {...pageProps} key={router.route}/>
        </PageTransition>
          <Target/>
          <DeviceChecker/>
          <style jsx global>{`
            .page-transition {
              height: 100vh;
              background: pink;
            }
            .page-transition-enter {
              // opacity: 0.5;
              transform: translate3d(0, 10px, 0);
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
              // opacity: 0.5;
              transition: opacity ${TIMEOUT}ms;
            }
          `}
        </style>
      </Provider>
    </>
  )
}

export default withReduxStore(App);