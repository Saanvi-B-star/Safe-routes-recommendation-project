import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Login.css";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    // const [password,setPassword] = useState("");

    const checkName = (e) =>
    {
      if (/^[A-Za-z]*$/.test(e.target.value)) 
      {
        setName(e.target.value);
        setErrorName(""); // Clear error if input is valid
      } 
      else 
      {
        setErrorName("Only alphabets are allowed!");
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const res = await axios.post("http://localhost:5000/login", { email });

          alert(res.data.message); // Show success message
          navigate("/home"); // Redirect to home page

      } catch (err) {
          if (err.response && err.response.status === 404) {
              alert("Email not found. Please sign up first.");
              navigate("/signUp");
          } else {
              alert("Login failed: " + (err.response?.data?.error || "Unknown error"));
          }
      }
  };

    // const handleSubmit = async(e) =>
    // {
    //     e.preventDefault();
    //     try
    //     {
    //         const res = await axios.post("http://localhost:5000/login", {email});
    //         alert(res.data.message);
    //         navigate("/home");
    //     }
    //     catch(err)
    //     {
    //         alert("Registration failed : " + err.response.data.error);
    //     }
    //     // console.log("submiitted");
    // };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        {/* <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          minLength={8}
          required
        /> */}
        <button type="submit" style={{backgroundColor: "#007bff"}}>Submit</button>
      </form>
    </div>
  );
};

export default Login;