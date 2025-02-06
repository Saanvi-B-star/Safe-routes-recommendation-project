import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Feedback from "./Components/Feedback";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
    // <div>
    //   {/* <Login/> */}
    //   <Home/>
    // </div>
  );
}

export default App;
