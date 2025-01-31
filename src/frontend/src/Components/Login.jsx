// import React from "react";
// import "../Style/Login.css";
// // import googleLogo from "../assets/google-logo.png";
// // import facebookLogo from "../assets/facebook-logo.png";
// // import appleLogo from "../assets/apple-logo.png";

// const Login = () => {

//   const submitForm = async(e) =>
//   {
//     e.preventDefault();
//     console.log("form submit");
//   }

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={submitForm}>
//       <input type="text" placeholder="Name" required/>
//       <input type="email" placeholder="Email" required/>
//       <input type="number" placeholder="Age" required/>
//       <input type="text" placeholder="Gender" required/>
//       <input type="tel" placeholder="Emergency Contact" required/>
//       <button type="submit">Submit</button>
//       </form>
//       {/* <div className="social-icons">
//         <img src={googleLogo} alt="Google" />
//         <img src={facebookLogo} alt="Facebook" />
//         <img src={appleLogo} alt="Apple" />
//       </div> */}
//     </div>
//   );
// };

// export default Login;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Login.css";

const Login = () => {
  const navigate = useNavigate(); // React Router hook for navigation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    emergencyContact: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh

    // Validate that all fields are filled
    if (
      formData.name &&
      formData.email &&
      formData.age &&
      formData.gender &&
      formData.emergencyContact
    ) {
      navigate("/home"); // Redirect to Home Page
    } else {
      alert("Please fill all fields!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="emergencyContact"
          placeholder="Emergency Contact"
          value={formData.emergencyContact}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
