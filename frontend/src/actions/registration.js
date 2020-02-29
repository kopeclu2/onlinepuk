import Axios from "axios"
import { toast } from "react-toastify"
import {push} from 'connected-react-router'
import {loginSucces} from './login'

export const registration = (values) => async(dispatch,getState) => {
    dispatch({type:'REGISTRATION_LOADING'})
    Axios.post('http://localhost:4000/users/signup', {
            ...values
    }).then((data) => {
        dispatch(loginSucces(data))
        localStorage.setItem('token', data.token)
        dispatch(push('/'))
        toast('Úspěšně jste se registroval, Vítejte', {
            hideProgressBar: true,
            position: toast.POSITION.BOTTOM_CENTER,
            pauseOnHover: true,
            autoClose: 10000,
            type: toast.TYPE.DEFAULT
        })
        dispatch({type:'REGISTRATION_LOADING_FINISH'})
    }).catch((e) => {
        toast(e.response.data.message, {
            hideProgressBar: true,
            position: toast.POSITION.BOTTOM_CENTER,
            pauseOnHover: true,
            autoClose: 10000,
            type: toast.TYPE.ERROR
        })
        dispatch({type:'REGISTRATION_LOADING_FINISH'})
        console.log('ERR', e.response)}
   
    )

}