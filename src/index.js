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
import { useSelector  } from 'react-redux'
import { isLoaded  } from 'react-redux-firebase';

/* uso de thunk para hacer llamadas asincronas a la api de Firestore */
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
        reduxFirestore(firebase,fbConfig)
    )
);

/* Con esta configuracion tendremos los datos del usuario de firestore sin hacer consulta a su collection  */
/* automaticamente se vincula el id de fireAuth con la collection users con el mismo id*/
const rrfConfig = {
    userProfile: 'users', /* Indicamos la collecion donde se encuentra los usuarios */
    useFirestoreForProfile: true
}

/*  Props para el componente <ReacrReduxFirebaseProvider> */
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
    presence: 'presence',
    sessions: 'sessions'

};

function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <div>Cargando...</div>;
    return children
}


ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
                <App/>
            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
