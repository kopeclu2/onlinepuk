import axios from "axios";

const updateComment = (id, value) => async (dispatch, getState) => {
  const { user } = getState();
  fetch("/chatRoom/updateComment", {
    method: "POST",
    body: JSON.stringify({
      _id: id,
      content:value 
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
export default updateComment;
