import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Components/layout/Body";
import Login from "./Components/auth/Login";
import HomePage from "./Components/home/HomePage";
import Toast from "./Components/ui/Toast";
import EditProfileDashboard from "./Components/Profile/EditProfileDashboard";
import ProfileDashboard from "./Components/Profile/ProfileDashboard";
import VaultDashboard from "./Components/vault/VaultDashboard";
import VaultItems from "./Components/vault/VaultItems";
import SharedDashboard from "./Components/shared/SharedDashboard";

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
            <Route path="/shared" element={<SharedDashboard />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
