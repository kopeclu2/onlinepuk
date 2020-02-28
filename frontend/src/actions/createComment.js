import { toast } from "react-toastify";
export const createComment = value => (dispatch, getState) => {
  const { user } = getState();
  fetch("http://localhost:4000/chatRoom/create", {
    method: "POST",
    body: JSON.stringify({
      content: value,
      user: user.sub
    }),
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      dispatch({ type: "ADDED_COMMENT", payload: res });
      toast("✅ Komentar byl přidán", {
        hideProgressBar: true
      });
    })
    .catch(err => toast.warn("Něco se nezdařilo"));
};
