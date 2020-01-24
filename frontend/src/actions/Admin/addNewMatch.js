import Axios from 'axios'
import {toast} from 'react-toastify'
import {addMatchClose} from '../../actions/uiActions'
export const addNewMatch = (match) => (dispatch, getState) => {
    const { user } = getState();
    dispatch({ type: 'ADDING_MATCH' })
    fetch('http://localhost:4000/matches/create', {
        method: 'POST', body: JSON.stringify(match),
         headers: {
            Authorization: `Bearer ${user.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((res) => {
        if(res.status === 200) {
            return res.json()
        } else {
            throw new Error()
        }
    })
    .then((res)=> { dispatch({type: 'ADD_MATCH', payload: res}); dispatch(addMatchClose()); toast('✅ Zápas byl přidán', {
        hideProgressBar: true
    })})
    .catch((err)=> toast.warn('Něco se nezdařilo')) 
}