import { push } from "connected-react-router";
import { toast } from "react-toastify";
import { logout } from "./login";

export const checkForValidUser = () => (dispatch, getState) => {
  fetch(`http://localhost:4000/users/check`, {
    method: "POST",
    body: JSON.stringify({ token: localStorage.getItem("token") }),

    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .catch(err => {
      if (err.text) {
        console.log(err.text());
      }
      dispatch(logout());
      toast.warn("Došlo k vyprchání tokenu přihlaste se prosím znovu");
      dispatch(push("/login"));
    });
};
