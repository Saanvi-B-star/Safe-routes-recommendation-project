import React from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";

const SocialLoginButtons = () => {
  return (
    <div className="social-login">
      <button className="google"><FaGoogle /> Google</button>
      <button className="facebook"><FaFacebook /> Facebook</button>
      <button className="apple"><FaApple /> Apple</button>
    </div>
  );
};

export default SocialLoginButtons;
