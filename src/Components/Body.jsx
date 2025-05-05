import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar /> {/* Optional */}
      <main className="flex-grow">
        <Outlet /> {/* This renders Feed, Login, etc. */}
      </main>
      <Footer />
    </div>
  );
};

export default Body;
