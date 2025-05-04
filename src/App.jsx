import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Components/Body";
import Feed from "./Components/Feed";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import HomePage from "./Components/HomePage";
import Toast from "./Components/Toast";

const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Toast />
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<HomePage />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
