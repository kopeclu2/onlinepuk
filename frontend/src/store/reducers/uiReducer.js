const initialState = {
  addMatchBool: false,
  editingMatch: {
    bool: false,
    id: null
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "ADD_MATCH_OPEN":
      return {
        ...state,
        addMatchBool: true
      };
    case "ADD_MATCH_ClOSE":
      return {
        ...state,
        addMatchBool: false
      };
    case "EDIT_MATCH_OPEN":
      return {
        ...state,
        addMatchBool: false,
        editingMatch: {
          bool: true,
          id: action.payload
        }
      };
    case "EDIT_MATCH_ClOSE":
      return {
        ...state,
        addMatchBool: false,
        editingMatch: {
          bool: false,
          id: null
        }
      };
    default:
      return state;
  }
}
