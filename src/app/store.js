import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../features/user/userSlice";
import toastReducer from "../features/toast/toastSlice";
import feedReducer from "../features/feed/feedSlice";

const userPersistConfig = {
	key: "user",
	storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const appStore = configureStore({
	reducer: {
		user: persistedUserReducer,
		toast: toastReducer,
		feed: feedReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(appStore);
export default appStore;
