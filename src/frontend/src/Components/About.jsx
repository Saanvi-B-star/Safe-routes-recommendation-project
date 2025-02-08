import React from 'react'
import "../Style/About.css"

function About () {

  return (
    <>
      <div id="about-section" className="abtContainer">
        <div className="actualContent">
        <h1 style={{color: "#0077b6", 
    fontSize: "80px", 
    fontFamily: "'Playfair Display', serif", 
    fontStyle: "italic"}}>About Us</h1>
        <p style={{ fontSize: "25px" ,color: "#2c3e50" , fontWeight: "bold" , marginTop:"-4vh"}} className="para">
        At Saferi, we believe safety is a right, not a privilege. We analyze crime reports, accidents, CCTV coverage, and population density to recommend the safest and shortest routes. With live navigation and an SOS feature, Saferi is more than just a map—it’s your trusted travel companion. Whether commuting to work, school, or anywhere else, navigate with confidence. Your safety matters—let’s make every journey safer, together.
        </p>
        </div>
      </div>
    </>
  )
}

export default About;