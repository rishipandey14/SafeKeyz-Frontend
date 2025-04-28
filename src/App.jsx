import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Components/Body";
import Feed from "./Components/Feed";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import HomePage from "./Components/HomePage";
import { Provider } from "react-redux";
import appStore from "./utils/appStore"
import Toast from "./Components/Toast";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Toast />
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<HomePage />} />
              <Route path="/feed" element={<Feed />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
