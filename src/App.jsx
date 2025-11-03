import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Components/Body";
import Feed from "./Components/Feed/Feed";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import Toast from "./Components/Toast";
import EditProfileDashboard from "./Components/Profile/EditProfileDashboard"
import ProfileDashboard from "./Components/ProfileDashboard"
const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Toast />
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<HomePage />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<ProfileDashboard />} />
            <Route path="/editprofile" element={<EditProfileDashboard />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
