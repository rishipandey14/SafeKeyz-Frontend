import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    const fetchUser = async () => {
      if(userData && userData.emailId) return ;

      try {
        const res = axios.get(BASE_URL + "/profile/view", {withCredentials: true});
        dispatch(addUser(res.data.data));
      } catch (err) {
        if(err.response && err.response.status === 401) return navigate("/login");
        console.log(err);
      }
    };
    fetchUser();
  }, [userData, dispatch, navigate]);


  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;