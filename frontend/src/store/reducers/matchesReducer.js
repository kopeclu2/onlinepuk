import { match, mergeRight } from "ramda"

const initialState = {
    matchesLoading: false,
    matches: [],
    finishedMatches: [],
}
const matchesReducer = (state = initialState , {payload, type}) => {
    switch(type){
        case 'LOADING_MATCHES_PENDING':
            return {
               ...state,
               matchesLoaded: false, 
            }
        case 'LOADING_MATCHES_FINISH': 
            return { 
                ...state,
                matchesLoaded: true,
            }
        case 'ADD_MATCH':
            return  {
                ...state,
                matches: payload
            } 
        case 'LOADING_MATCHES': 
             return {
                ...state,
                matches: [...payload]
              }
        case 'DELETE_MATCH': 
            const newMatches = state.matches.filter((match) => match.id !== payload)
             return {
                ...state,
                matches: newMatches
              }
              case 'LOADING_MATCHES_FINSIHED': 
              return {
                 ...state,
                 finishedMatches: [...payload]
               }
        case 'UPDATE_SCORE_AFTER_GOAL_SOCKET':
        const updatedMatchIndex = state.matches.findIndex((match) => match.id === payload.id)
        const updatedMatch = mergeRight(state.matches[updatedMatchIndex],payload)
        const newMatchesGoal = state.matches.map((match) => match.id === payload.id ? updatedMatch : match)
        return {
            ...state,
            matches: newMatchesGoal
        }
        default:
            return state;    
    }
}
export default matchesReducer;