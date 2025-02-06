import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/SignUp.css";
import axios from "axios";

const SignUp = () => {
    const navigate = useNavigate();
    const [errorName,setErrorName] = useState("");  
    const [errorEmergencyContact,setErrorEmergencyContact] = useState("");  
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    // const [password,setPassword] = useState("");
    const [age,setAge] = useState("");
    const [gender,setGender] = useState("");
    const [emergencyContact,setEmergencyContact] = useState("");

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

    const checkEmergencyContact = (e)=>
    {
      const value = e.target.value;
      if (/^[0-9]*$/.test(value)) 
      {
        setEmergencyContact(value);
        setErrorEmergencyContact("");
      } 
      else 
      {
        setErrorEmergencyContact("Only numbers are allowed!");
      }
    }

  const handleSubmit = async(e) =>
    {
        e.preventDefault();
        try
        {
            const res = await axios.post("http://localhost:5000/signUp", {name, email , age , gender , emergencyContact});
            alert(res.data.message);
            navigate("/home");
        }
        catch(err)
        {
            alert("Registration failed : " + err.response.data.error);
            navigate("/login");
        }
        // console.log("submiitted");
    };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={checkName}
          required
        />
        {errorName && <p style={{ color: "red" }}>{errorName}</p>} {/* Show error message */}
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
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={age}
          onChange={(e)=>setAge(e.target.value)}
          min={1}
          max={100}
          required
        />
        {/* <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={gender}
          onChange={(e)=>setGender(e.target.value)}
          required
        /> */}
      <select className="selectGender" value={gender} onChange={(e)=>setGender(e.target.value)} required>
        {/* <option value="">-- Select --</option> Placeholder */}
        <option value="" disabled hidden>Select Gender</option> {/* Acts as a placeholder */}
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
        <input
          type="text"
          name="emergencyContact"
          placeholder="Emergency Contact"
          value={emergencyContact}
          onChange={checkEmergencyContact}
          minLength={10}
          maxLength={10}
          required
        />
        {errorEmergencyContact && <p style={{ color: "red" }}>{errorEmergencyContact}</p>} {/* Show error message */}
        <button type="submit" style={{backgroundColor: "#007bff"}}>Submit</button>
      </form>
    </div>
  );
};

export default SignUp;