import React from 'react'
import { Link } from 'react-router-dom';
import "../Style/Welcome.css"

function Welcome () {

  return (
    <>
      <div className="container">
      <h1 className='typing-content heading' > 
    Welcome to Saferi
</h1>

      <p className='paragraph'>
      Shortest. Safest. Smartest

</p>
        <Link to="/login"><button className="stJourney">Login</button></Link>
      </div>
    </>
  )
}

export default Welcome;