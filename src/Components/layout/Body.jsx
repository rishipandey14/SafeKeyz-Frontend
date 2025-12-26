import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Body = () => {
  const user = useSelector((store) => store?.user?.user);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <div className="flex flex-1">
        {user && !isHomePage && <Sidebar />}
        <main className="flex-grow overflow-auto h-full">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Body;
