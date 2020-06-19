import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from "./reducers/rootReducer";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore, createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import fbConfig from "./config/fbConfig";
import firebase from "firebase/app";

/* uso de thunk para hacer llamadas asincronas a la api de Firestore */
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
        reduxFirestore(fbConfig)
    )
);

/*  Props para el componente <ReacrReduxFirebaseProvider> */
const rrfProps = {
    firebase,
    config: fbConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};


ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App/>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
