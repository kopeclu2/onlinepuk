import { toast } from "react-toastify";
const createSubComment = (parrentID,content) => (dispatch, getState) => {
    console.log()
    const { user } = getState();
    fetch("/chatRoom/createSubComment", {
      method: "POST",
      body: JSON.stringify({
        parrentID: parrentID,
        content: content,
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
        dispatch({ type: "DISCUSION_COMMENTS", payload: res });
        toast("✅ Komentar byl přidán", {
          hideProgressBar: true
        });
      })
      .catch(err => toast.warn("Něco se nezdařilo"));
}
export default createSubComment