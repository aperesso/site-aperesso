import ReactGA from "react-ga"


const initGA = (DATA_LAYER_ID) => {
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