import {toast} from 'react-toastify'
export const setRoleToUser = (_id, role) => (dispatch, getState) => {
  const { user } = getState();
  fetch("/users/setUserRole", {
    method: "POST",
    body: JSON.stringify({
      _id: _id,
      role: role
    }),
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
          throw new Error()
      }
    })
    .then(res => dispatch({ type: "ALL_USERS", payload: res }))
    .catch((e) => {
        toast(e.response.data.message, {
            hideProgressBar: true,
            position: toast.POSITION.BOTTOM_CENTER,
            pauseOnHover: true,
            autoClose: 10000,
            type: toast.TYPE.ERROR
        })
    })

};
