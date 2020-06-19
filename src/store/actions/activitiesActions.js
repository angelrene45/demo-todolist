// Middleware redux thunk
export const createActivity = (newActivity) => {
    return async (dispatch,getState, {getFirebase,getFirestore}) => {

        // hacer una llamada asincrona a fireStore
        const firestore = getFirestore();

        try {
            await firestore.collection('activities').add({
                ...newActivity,
                createdAt:new Date()
            });

            // Despachamos en pointsReducer
            dispatch({
                type:'CREATE_POINT',
                payload: newMarket
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
                type:'REMOVE_POINT',
                payload: id
            });

        } catch (e) {
            // Error Firebase
            console.log(e)
        }
    }
};
