import Axios from "axios"
import {history} from '../App'
import {push} from 'connected-react-router'
import {toast} from 'react-toastify'
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
    Axios.post('/users/authenticate', { username, password   })
    .then(({data}) => {
        dispatch(loginSucces(data))
        localStorage.setItem('token', data.token)
        dispatch(push('/'))
        dispatch(loginPendingFinish())
    })
    .catch(err => {
        toast(err.response.data.message, {
            hideProgressBar: true,
            position: toast.POSITION.BOTTOM_CENTER,
            pauseOnHover: true,
            autoClose: 10000,
            type: toast.TYPE.ERROR
        })
        dispatch(loginPendingFinish())
    })
    
}
export const logout = () => (dispatch) => {
    dispatch({type: 'LOGOUT'})
    dispatch(push('/'))
    localStorage.removeItem('token')
}
