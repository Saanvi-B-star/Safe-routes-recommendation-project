import React from 'react'
import Navbar from './Navbar'
import Welcome from './Welcome'
import About from './About'
import "../Style/LandingPage.css";

function LandingPage () {
  return (
    <>
      <div className="landpg">
      <Navbar/>
      <Welcome/>
      <About/>
      </div>
    </>
  )
}

export default LandingPage;