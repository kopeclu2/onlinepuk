import Axios from "axios"

export const loadTeams = () => (dispatch) => {
    dispatch({type:'TEAM_LOADING'})
    Axios.get('http://localhost:4000/teams/all')
    .then(({data}) => {
        dispatch({type: 'TEAMS', payload: data})
    })
}