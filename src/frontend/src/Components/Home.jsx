import React from "react";
import "../Style/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-links">
          <a href="/home">Home</a>
          <a href="/feedback">Feedback</a>
          <a href="/">Login</a>
        </div>
        {/* SOS Button */}
        <button className="sos-button">SOS</button>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Side Source & Destination Section */}
        <div className="location-section">
          <label>Source</label>
          <input type="text" placeholder="Enter source" />
          <label>Destination</label>
          <input type="text" placeholder="Enter destination" />
        </div>
        {/* Background Map */}
        <div className="map-background"></div>
      </div>
    </div>
  );
};

export default Home;
