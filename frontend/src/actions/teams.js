import Axios from "axios"

export const loadTeams = () => (dispatch) => {
    dispatch({type:'TEAM_LOADING'})
    Axios.get('/teams/all')
    .then(({data}) => {
        dispatch({type: 'TEAMS', payload: data})
    })
}