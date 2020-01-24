import Axios from "axios"
import {history} from '../App'
import {push} from 'connected-react-router'

export const loginPending = () => {
    return {
        type: 'LOGIN_PENDING'
    }
}
export const loginPendingFinish = () => {
    return {
        type: 'LOGIN_PENDING_FINISH'
    }
}
export const loginSucces = (data) => ({
    type: 'LOGIN_SUCCES',
    payload: data
})
export const login = (username,password) => (dispatch) => {
    dispatch(loginPending())
    Axios.post('http://localhost:4000/users/authenticate', { username, password   })
    .then(({data}) => {
        dispatch(loginSucces(data))
        localStorage.setItem('token', data.token)
        dispatch(push('/'))
    })
    .catch(err => console.log(err))
    dispatch(loginPendingFinish())
}
export const logout = () => (dispatch) => {
    dispatch({type: 'LOGOUT'})
    dispatch(push('/'))
}
