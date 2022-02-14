import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import configureStore from './store/configureStore';
import App from './App';
import * as serviceWorker from './serviceWorker';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

// @ts-ignore
const store = configureStore({});

const AppContainer = ():JSX.Element => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root'),
);

serviceWorker.register({
  onUpdate: async registration => {
    // We want to run this code only if we detect a new service worker is
    // waiting to be activated.
    // Details about it: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
    if (registration && registration.waiting) {
      await registration.unregister();
      // Makes Workbox call skipWaiting()
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      // Once the service worker is unregistered, we can reload the page to let
      // the browser download a fresh copy of our app (invalidating the cache)
      window.location.reload();
    }
  },
});

export default AppContainer;
