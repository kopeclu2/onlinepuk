import axios from 'axios'
import {loginSucces} from './login.js'
import {toast} from 'react-toastify'
export const loadUserFromToken = () => (dispatch, getState) => {
    const token = localStorage.getItem('token')
    if(!token || token === ''){
        return ;
    }
    const request = axios({method: 'POST', url: 'http://localhost:4000/users/get/user/from/token', data: {token: token}});
    request.then(response => {
        dispatch(loginSucces(response.data.user));
        localStorage.setItem('token',response.data.token )
    }).catch((err) => {toast.warning(err.response.data.message); localStorage.removeItem('token');})
   
}