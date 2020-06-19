const initState = {
    stores : []
};

/*
   Middleware thunk en el archivo activitiesActions.js
   en el middleware hacemos las llamadas asincronas
*/
const activitiesReducers = (state = initState,action) => {
    switch (action.type) {
        case "CREATE_ACTIVITY":
            // No es necesario hacer nada ya que los datos estan sincronizados con firestore
            return state;

        case "REMOVE_ACTIVITY":
            // No es necesario hacer nada ya que los datos estan sincronizados con firestore
            return state;

        case "UPDATE_ACTIVITY":
            // No es necesario hacer nada ya que los datos estan sincronizados con firestore
            return state;

        default:
            return state;
    }
}

export default activitiesReducers;
