import axios from "axios";

const deleteComment = (id) => async (dispatch, getState) => {
  const { user } = getState();
  fetch("/chatRoom/delete", {
    method: "POST",
    body: JSON.stringify({
      _id: id
    }),
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => dispatch({ type: "DISCUSION_COMMENTS", payload: res }))
    .catch((err)=> console.log(err));
};
export default deleteComment;
