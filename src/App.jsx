import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/layout/Body";
import Login from "./components/auth/Login";
import HomePage from "./components/home/HomePage";
import Toast from "./components/ui/Toast";
import EditProfileDashboard from "./components/profile/EditProfileDashboard";
import ProfileDashboard from "./components/profile/ProfileDashboard";
import VaultDashboard from "./components/vault/VaultDashboard";
import VaultItems from "./components/vault/VaultItems";

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
