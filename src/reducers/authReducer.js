const initState = {
    authError:null,
    registerError:null
};

const authReducer = (state = initState,action) => {

    switch (action.type) {

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError:null
            };
        case 'LOGIN_ERROR':

            return {
                ...state,
                authError:'Error al iniciar sesión'
            };

        case'SIGNOUT_SUCCES':
            console.log("cerro sesion")
            return state;

        case 'SIGNUP_SUCCESS':
            console.log("Usuario registrado");
            return state;

        case'SIGNUP_ERROR':
            console.log("error");
            return {
                ...state,
                registerError:action.payload
            }
        default:
            return state;
    }

}

export default authReducer;
