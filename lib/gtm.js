import ReactGA from "react-ga"
import getConfig from 'next/config';

const { publicRuntimeConfig : { DATA_LAYER_ID} } = getConfig();

const initGA = () => {
  ReactGA.initialize(DATA_LAYER_ID)
}
 
const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export default {
    initGA,
    logPageView
}