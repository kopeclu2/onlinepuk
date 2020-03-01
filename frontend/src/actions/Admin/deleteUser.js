

export const deleteUser = (id) => (dispatch,getState) => {
    const {user} = getState();
    fetch('/users/deleteUser', {
        method: 'POST', 
        body : JSON.stringify({
            _id: id
        }),
         headers: {
            Authorization: `Bearer ${user.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((res)=> res.json()).then((res) => dispatch({type: "ALL_USERS", payload: res}))
}