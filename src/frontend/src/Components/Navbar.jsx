import React from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
