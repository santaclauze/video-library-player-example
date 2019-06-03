import React from 'react';
import ReactDOM from 'react-dom';
import BootstrapProvider from '@bootstrap-styled/provider/lib/BootstrapProvider';

// react-slick css
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

// font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRedo, faSpinner } from '@fortawesome/free-solid-svg-icons'

import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from './theme';

// font-awesome lib
library.add(faRedo)
library.add(faSpinner)

ReactDOM.render(<BootstrapProvider injectGlobal reset theme={theme}><App /></BootstrapProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
