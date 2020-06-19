import authReducer from "./authReducer";
import activitiesReducer from "./activitiesReducer";
import { combineReducers} from 'redux';
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
   auth: authReducer,
   activities: activitiesReducer,
   firestore: firestoreReducer
});

export default rootReducer;
