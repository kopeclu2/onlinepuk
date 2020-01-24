
const initialState = {
    loaded: false,
}
const matchDetailReducer = (state = initialState , {payload, type}) => {
    switch(type){
        case 'LOADING_MATCH':
            return {
               ...state,
               loaded: false, 
            }
        case 'LOADING_MATCH_DETAIL_FINISHED': 
            return { 
                ...state,
                loaded: true,
             }
        case 'LOADED_MATCH': 
             return {
                ...state,
                ...payload
              }
        default:
            return state;    
    }
}
export default matchDetailReducer;