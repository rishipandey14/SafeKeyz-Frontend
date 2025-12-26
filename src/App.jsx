import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Components/layout/Body";
import Login from "./Components/auth/Login";
import HomePage from "./Components/home/HomePage";
import Toast from "./Components/ui/Toast";
import EditProfileDashboard from "./Components/profile/EditProfileDashboard";
import ProfileDashboard from "./Components/profile/ProfileDashboard";
import VaultDashboard from "./Components/vault/VaultDashboard";
import VaultItems from "./Components/vault/VaultItems";

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
