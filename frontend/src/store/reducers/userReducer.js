
const initialState = {
    isAuthenticated: false,
    }
const userReducer = (state = initialState , {payload, type}) => {
    switch(type){
        case 'LOGIN_SUCCES': 
            return {
                isAuthenticated: true,
                ...payload
            }
        case 'LOGOUT': 
            return {
                isAuthenticated: false,
            }
        default: 
            return state;
    }
}
export default userReducer;