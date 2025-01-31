import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../Style/Login.css";
import axios from "axios";

const Login = () => {
//   const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [age,setAge] = useState("");
    const [gender,setGender] = useState("");
    const [emergencyContact,setEmergencyContact] = useState("");

  const handleSubmit = async(e) =>
    {
        e.preventDefault();
        try
        {
            const res = await axios.post("http://localhost:5000/login", {name, email , age , gender , emergencyContact});
            alert(res.data.message);
        }
        catch(err)
        {
            alert("Registration failed : " + err.response.data.error);
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
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={age}
          onChange={(e)=>setAge(e.target.value)}
          required
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={gender}
          onChange={(e)=>setGender(e.target.value)}
          required
        />
        <input
          type="tel"
          name="emergencyContact"
          placeholder="Emergency Contact"
          value={emergencyContact}
          onChange={(e)=>setEmergencyContact(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;