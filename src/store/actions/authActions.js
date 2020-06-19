export const signIn = (credentials) => {
    return async (dispatch,getState,{getFirebase}) => {

        const firebase = getFirebase();

        try {
            await firebase.auth().signInWithEmailAndPassword(
                credentials.email,
                credentials.password
            );
            dispatch({type:'LOGIN_SUCCESS'});
        }catch (e) {
            dispatch({type:'LOGIN_ERROR'})
            console.log(e);
        }

    }
}

export const signOut = () => {
    return async (dispatch,getState,{getFirebase}) => {

        const firebase = getFirebase();

        try {
            await firebase.auth().signOut();
            dispatch({type:'SIGNOUT_SUCCES'})
        }catch(e){
            console.log(e)
        }
    }
}

export const registerUser = (user) => {
    return async (dispatch,getState,{getFirebase,getFirestore}) => {

        const firebase = getFirebase();
        const firestore = getFirestore();

        try {

            const result = await firebase.auth().createUserWithEmailAndPassword(
                user.email,
                user.password
            );

            await firestore.collection('users').doc(result.user.uid).set({
                name:user.name,
                email:user.email,
                group:user.group
            });

            dispatch({type:'SIGNUP_SUCCESS'})
        }catch (e) {
            console.log(e);
            dispatch({
                type:'SIGNUP_ERROR',
                payload:e.message
            })
        }

    }
}
