const initState = {
  loading: false,
  comments: []
};
const discussionReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADING_DISCUSION":
      return {
        ...state,
        loading: true
      };
    case "FINISHED_LOADING_DISCUSION":
      return {
        ...state,
        loading: false
      };
    case "DISCUSION_COMMENTS":
        return {
            ...state,
            comments: action.payload
        }
    case "ADDED_COMMENT": {
        return {
            ...state,
            comments: [               
                action.payload,
                ...state.comments,
            ]
        }
    }
    default:
        return state;
  }
};
export default discussionReducer;
