// Middleware redux thunk
export const createActivity = (newActivity) => {
    return async (dispatch,getState,{getFirebase,getFirestore}) => {

        // hacer una llamada asincrona a fireStore
        const firestore = getFirestore();

        try {
            await firestore.collection('activities').add({
                ...newActivity,
                createdAt:new Date()
            });

            // Despachamos en pointsReducer
            dispatch({
                type:'CREATE_ACTIVITY',
                payload: newActivity
            });

        } catch (e) {
            // Error Firebase
            console.log(e)
        }
    }
};

export const editActivity = (activity) => {
    return async (dispatch,getState, {getFirebase,getFirestore}) => {

        const {id} = activity;

        // hacer una llamada asincrona a fireStore
        const firestore = getFirestore();

        try {
            await firestore.collection('activities').doc(id).update({...activity});

            // Despachamos en pointsReducer
            dispatch({
                type:'UPDATE_ACTIVITY',
                payload: id
            });

        } catch (e) {
            // Error Firebase
            console.log(e)
        }
    }
};


export const deleteActivity = ({id}) => {
    return async (dispatch,getState, {getFirebase,getFirestore}) => {

        // hacer una llamada asincrona a fireStore
        const firestore = getFirestore();

        try {
            await firestore.collection('activities').doc(id).delete();

            // Despachamos en pointsReducer
            dispatch({
                type:'REMOVE_ACTIVITY',
                payload: id
            });

        } catch (e) {
            // Error Firebase
            console.log(e)
        }
    }
};
