import React from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Body = () => {
  const user = useSelector((store) => store?.user?.user);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <div className="flex flex-1">
        {user && !isHomePage && <Sidebar />}
        <main className="flex-grow overflow-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Body;
