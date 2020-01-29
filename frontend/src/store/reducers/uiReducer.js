const initialState = {
  addMatchBool: false,
  paginationCurrentPageFinished: 0,
  paginationCurrentPageScheduled: 0,
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
    case 'SET_CURRENT_PAGE_PAGINATION_FINISHED': 
    return {
      ...state,
      paginationCurrentPageFinished: action.payload
    }
    case 'SET_CURRENT_PAGE_PAGINATION_SCHEDULED':
      return {
        ...state,
        paginationCurrentPageScheduled: action.payload
      }
    default:
      return state;
  }
}
