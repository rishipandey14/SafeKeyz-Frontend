import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import toastReducer from "./toastSlice";
import feedReducer from "./feedSlice";
import {persistStore , persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";


const userPersistConfig = {
  key : "user",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const appStore = configureStore({
  reducer : {
    user : persistedUserReducer,
    toast : toastReducer,
    feed : feedReducer,
  },
  middleware : (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck : false,
    }),
});

export const persistor = persistStore(appStore);

export default appStore;