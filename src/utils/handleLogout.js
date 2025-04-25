/* eslint-disable no-unused-vars */
import axios from "axios";
import {BASE_URL} from "./constants";
import {removeUser} from "./userSlice";

export const handleLogout = async (dispatch, navigate) => {
  try {
    const res = await axios.post(BASE_URL + "/logout", {}, {withCredentials : true});
    dispatch(removeUser());
    navigate("/");
  } catch (err) {
    console.error(err);
  }
}