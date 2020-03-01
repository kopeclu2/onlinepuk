import axios from "axios";
import { loginSucces } from "./login.js";
import { toast } from "react-toastify";
import { history } from "../App.js";
import { push } from "connected-react-router";
export const loadUserFromToken = () => (dispatch, getState) => {
  const token = localStorage.getItem("token");
  if (!token || token === "") {
    return;
  }
  const request = axios({
    method: "POST",
    url: "/users/get/user/from/token",
    data: { token: token }
  });
  request
    .then(response => {
      console.log(response);
      dispatch(loginSucces(response.data));
      localStorage.setItem("token", response.data.token);
    })
    .catch(err => {
      toast.warning("Špatný token, přihlašte se znovu prosím");
      dispatch(push("/login"));
      localStorage.removeItem("token");
    });
};
