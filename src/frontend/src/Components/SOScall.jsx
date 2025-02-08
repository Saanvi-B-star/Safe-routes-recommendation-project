import React, { useRef, useState } from "react";
import policeSiren from "../assets/police-siren.mp3"; // Ensure this file exists in the same directory

const SOScall = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSOSCall = () => {
    if (isPlaying) {
      // Stop the siren
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      const userConfirmed = window.confirm("Do you want to play the police siren sound?");
      if (userConfirmed && audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleSOSCall}
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bottom: "20px",
          right: "20px",
          padding: "10px",
          backgroundColor: "white",
          color: "white",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
          textAlign: "center",
          maxWidth: "4vw",
          height: "4vw",
          marginBottom: "140px",
          marginRight: "5px"
        }}
      >
        <i className="fa-solid fa-phone" style={{ fontSize: "1.75rem", marginLeft: "6px", color: "green" }}></i>
      </button>

      {/* Hidden audio element */}
      <audio ref={audioRef} src={policeSiren} />
    </div>
  );
};

export default SOScall;