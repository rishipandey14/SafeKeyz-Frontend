import React from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar /> {/* Optional */}
      <main className="min-h-screen bg-black text-gray-200">
        <Outlet /> {/* This renders Feed, Login, etc. */}
      </main>
      <Footer />
    </div>
  );
};

export default Body;
