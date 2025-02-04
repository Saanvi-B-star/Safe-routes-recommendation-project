import React from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";

const Navbar = () => {
  
  const scrollToAbout = () => 
  {
    document.getElementById("about-section").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <div className="logo_name">
        <div className="logo"></div>
      </div>
      <div className="sections">
        <Link to="/" onClick={scrollToAbout}>About</Link>
        <Link to="/signUp">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
