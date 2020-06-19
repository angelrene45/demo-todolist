import authReducer from "./authReducer";
import activitiesReducer from "./activitiesReducer";
import { combineReducers} from 'redux';
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
   auth: authReducer,
   activities: activitiesReducer,
   firestore: firestoreReducer,
   firebase: firebaseReducer
});

export default rootReducer;
