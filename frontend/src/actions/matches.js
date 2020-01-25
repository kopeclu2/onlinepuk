import Axios from "axios"
import {toast}from 'react-toastify'

const loadingMatchesPending = () => ({type:'LOADING_MATCHES_PENDING'})
const loadingMatchesFinish = () => ({type: 'LOADING_MATCHES_FINISH'})
const loadMacthes = (matches) => ({type:'LOADING_MATCHES', payload: matches})

export const loadMatches = () => (dispatch) => {
    dispatch(loadingMatchesPending())
    Axios.get('http://localhost:4000/matches')
    .then(({data}) => {
        dispatch({type:'LOADING_MATCHES', payload: data})
        dispatch({type: 'LOADING_MATCHES_FINISH'})
    })
    .catch((err) => {})
    Axios.get('http://localhost:4000/matches/finished')
    .then(({data}) =>{
        dispatch({type:'LOADING_MATCHES_FINSIHED', payload: data})
    })
    .catch((err) => {})
    
}

export const getMatchById = (id) => (dispatch) => {
    dispatch({type: 'LOADING_MATCH'})
    Axios.get(`http://localhost:4000/matches/${id}`)
    .then(({data}) => {
        dispatch({type: 'LOADED_MATCH', payload: data})
        dispatch({type: 'LOADING_MATCH_DETAIL_FINISHED'})
    })
    
}
export const deleteMatch = (id) => (dispatch, getState) => {
    const { user } = getState();
    fetch(`http://localhost:4000/matches/${id}/delete`, {
        method: 'DELETE',
         headers: {
            Authorization: `Bearer ${user.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((res) => {
        if(res.status === 200) {
            toast('✅ Zapas odstraněn', { hideProgressBar: true});
            dispatch({type:'DELETE_MATCH', payload: id})
        }
    })
    .then((res) => console.log(res))
}

export const updateMatchInfo = (id) => (dispatch,getState) => {
    const { user, form: {editingMatch: {values}} } = getState();
    fetch(`http://localhost:4000/matches/${id}/edit`, {
        method: 'POST',
         headers: {
            Authorization: `Bearer ${user.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
    })
    .then((res) => {
        if(res.status === 200) {
            toast('✅ Zapas Editovan', { hideProgressBar: true});
        }
    })
    .then((res) => console.log(res))
}