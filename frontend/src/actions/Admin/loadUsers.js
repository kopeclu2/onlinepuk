

export const loadUsers = () => (dispatch,getState) => {
    dispatch({type: 'LOADING_USERS'})
    const {user} = getState();
    fetch('/users/all', {
        method: 'GET', 
         headers: {
            Authorization: `Bearer ${user.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((res)=>{
        if(res.ok) {
            return res.json()
        } else {
            throw new Error();
        }
        
    }).then((res)=>{
        console.log(res)
        dispatch({type: "ALL_USERS", payload: res});
        dispatch({type: 'FINISHED_LOADING_USERS'});
    }).catch((e)=> console.log(e))

    dispatch({type: 'FINISHED_LOADING_USERS'})
}