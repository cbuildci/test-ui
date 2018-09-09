/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
// import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import createHistory from 'history/createBrowserHistory';
// import 'sanitize.css/sanitize.css';

// Import root app and constants
import App from 'containers/App';
import {
    WINDOW_BLUR,
    WINDOW_FOCUS,
    WINDOW_VISIBLE,
    WINDOW_HIDDEN,
} from 'containers/App/constants';

// Import providers
import LanguageProvider from 'containers/LanguageProvider';
import { WindowHeightProvider } from 'contexts/WindowHeight';

// Load the favicon and the .htaccess file
// import '!file-loader?name=[name].[ext]!./images/favicon.ico';

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
import './styles.scss';
import './fontawesome.scss';
import './global-styles';

// Create redux store with history
const initialState = {};
const history = createHistory({ basename: '/app' });

history.listen((location, action) => {
    if (action === 'PUSH') {
        window.scrollTo(0, 0);
    }
    // console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
    // console.log(`The last navigation action was ${action}`);
});

const store = configureStore(initialState, history);

// Dispatch events on window focus/visibility events.
window.addEventListener('blur', () => {
    store.dispatch({ type: WINDOW_BLUR });
});
window.addEventListener('focus', () => {
    store.dispatch({ type: WINDOW_FOCUS });
});
window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        store.dispatch({ type: WINDOW_VISIBLE });
    }
    if (document.visibilityState === 'hidden') {
        store.dispatch({ type: WINDOW_HIDDEN });
    }
});

const MOUNT_NODE = document.getElementById('app');

const render = (messages) => {
    ReactDOM.render(
        <Provider store={store}>
            <LanguageProvider messages={messages}>
                <ConnectedRouter history={history}>
                    <WindowHeightProvider>
                        <App />
                    </WindowHeightProvider>
                </ConnectedRouter>
            </LanguageProvider>
        </Provider>,
        MOUNT_NODE,
    );
};

if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['./i18n', 'containers/App'], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render(translationMessages);
    });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
    new Promise((resolve) => {
        resolve(import(/* webpackChunkName: "intl" */ 'intl'));
    })
        .then(() => (
            Promise.all([
                import(/* webpackChunkName: "intl-en" */ 'intl/locale-data/jsonp/en.js'),
            ])
        ))
        .then(() => render(translationMessages))
        .catch((err) => {
            throw err;
        });
}
else {
    render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
    // require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
