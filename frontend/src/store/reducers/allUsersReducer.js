const initState = {
  loading: false,
  users: []
};
const allUsersReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADING_USERS":
      return {
        ...state,
        loading: true
      };
    case "FINISHED_LOADING_USERS":
      return {
        ...state,
        loading: false
      };
    case "ALL_USERS":
      return {
        ...state,
        users: action.payload
      };

    default:
      return state;
  }
};
export default allUsersReducer;
