import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import toastReducer from "./toastSlice";
import feedReducer from "./feedSlice";


const appStore = configureStore({
  reducer : {
    user : userReducer,
    toast : toastReducer,
    feed : feedReducer,
  },
});

export default appStore;