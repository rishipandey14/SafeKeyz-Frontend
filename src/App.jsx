import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Components/Body";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import Toast from "./Components/Toast";
import EditProfileDashboard from "./Components/Profile/EditProfileDashboard"
import ProfileDashboard from "./Components/ProfileDashboard";
import VaultDashboard from "./Components/VaultDashboard";
import VaultItems from "./Components/VaultItems";

const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Toast />
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<HomePage />} />
            <Route path="/vault" element={<VaultDashboard />} />
            <Route path="/vault-items" element={<VaultItems />} />
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
