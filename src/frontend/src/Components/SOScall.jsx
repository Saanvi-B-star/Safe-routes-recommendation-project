import React, { useRef, useState } from "react";
import policeSiren from "../assets/police-siren.mp3"; // Ensure this file exists in the same directory

const SOScall = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSOSCall = async () => {
    setShowConfirmation(true); // Show the confirmation box
  };

  const handleConfirmYes = async () => 
  {
    setShowConfirmation(false);
    if (isPlaying) {
      // Stop the siren
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      if (showConfirmation && audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };
  
  const handleConfirmNo = () => 
  {
    setShowConfirmation(false);
  };

  // const handleSOSCall = () => {
  //   if (isPlaying) {
  //     // Stop the siren
  //     audioRef.current.pause();
  //     audioRef.current.currentTime = 0;
  //     setIsPlaying(false);
  //   } else {
  //     const userConfirmed = window.confirm("Do you want to play the police siren sound?");
  //     if (userConfirmed && audioRef.current) {
  //       audioRef.current.play();
  //       setIsPlaying(true);
  //     }
  //   }
  // };

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
        <i className="fa-solid fa-bell" style={{ fontSize: "1.75rem", marginLeft: "2px", color: "red" }}></i>
      </button>

      {showConfirmation && (
        <div
          style={{
            position: "absolute",
            bottom: "60px", // Just above the button
            right: "20px",
            background: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            zIndex: 1001,
            textAlign: "center",
          }}
        >
          <p>Do you want to send the sos : confirm </p>
          <button
            onClick={handleConfirmYes}
            style={{ marginRight: "10px", padding: "5px", backgroundColor: "red", color: "white", border: "none" }}
          >
            Yes
          </button>
          <button
            onClick={handleConfirmNo}
            style={{ padding: "5px", backgroundColor: "gray", color: "white", border: "none" }}
          >
            No
          </button>
        </div>
      )}

      {/* Hidden audio element */}
      <audio ref={audioRef} src={policeSiren} />
    </div>
  );
};

export default SOScall;