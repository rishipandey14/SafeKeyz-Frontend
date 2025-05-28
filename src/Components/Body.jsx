import React from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar /> {/* Optional */}
      <main className="min-h-screen bg-gradient-to-r from-green-900 via-black to-green-900 text-gray-200">
        <Outlet /> {/* This renders Feed, Login, etc. */}
      </main>
      <Footer />
    </div>
  );
};

export default Body;
