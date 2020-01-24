

const initialState = {
    allTeams: [],
    loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'TEAM_LOADING':
      return {
        ...state,
        loading: true
      };
    case 'TEAMS':
      return {
        ...state,
        allTeams: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
