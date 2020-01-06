import CssBaseline from "@material-ui/core/CssBaseline";
import "@babel/polyfill";

import '../scss/index.scss';

const App = ({Component, pageProps }) => {
  return (
    <>
      <CssBaseline/>
      <Component {...pageProps}/>
    </>
  )
}

export default App;