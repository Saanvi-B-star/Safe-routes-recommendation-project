import React from 'react'
import { Link } from 'react-router-dom';
import "../Style/Welcome.css"

function Welcome () {

  return (
    <>
      <div className="container">
        <h1 style={{color: "#007bff"}} className="typing-content">WELCOME TO SAFERI</h1>
        <p className="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus doloremque, quasi error amet laudantium mollitia eaque, cum reiciendis porro placeat vero iure delectus suscipit dolore officiis esse ab vel. Quam voluptatibus, eius itaque velit quidem vitae accusantium eaque soluta tempore cum optio debitis reprehenderit illo illum, placeat aspernatur, sapiente voluptatem libero et asperiores repudiandae a. Eligendi, obcaecati consectetur itaque doloremque officia mollitia consequatur voluptates fugiat delectus! Corporis sed, totam corrupti sapiente quod quisquam consequatur laboriosam quis, cumque qui ut voluptatum amet numquam adipisci doloribus tempore obcaecati dolorum aliquam. Aliquam officia ullam accusamus, voluptatum nesciunt nemo. Soluta laudantium voluptatem modi quod?
        </p>
        <Link to="/login"><button className="stJourney">Login</button></Link>
      </div>
    </>
  )
}

export default Welcome;