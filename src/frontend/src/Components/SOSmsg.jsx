import React, { useState } from "react";

const SOSmsg = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [messageText, setMessageText] = useState("");

  const handleSOSClick = async () => {
    setShowConfirmation(true); // Show the confirmation box
  };

  const handleConfirmYes = async () => 
  {
    setShowConfirmation(false);
    try {
      const response = await fetch("http://localhost:5000/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Save me!! Please help me as soon as possible, I'm in danger",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessageText("🚨 SOS Message Sent Successfully! 🚨");
      } else {
        setMessageText("❌ Failed to send SOS message!");
      }

    } catch (error) {
      setMessageText("⚠ Error sending SOS message!");
    }

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1000);
  };
  
  const handleConfirmNo = () => 
  {
    setShowConfirmation(false);
  };

  return (
    <div>
      <button
        onClick={handleSOSClick}
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
          marginBottom: "70px",
          marginRight: "5px"
        }}
      >
        <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '1.75rem', marginLeft: '2px', color: 'red'}}></i>
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

      {/* Visible SOS Message Popup */}
      {showMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "15px",
            backgroundColor: "#ff4d4d",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
            zIndex: 1001,
          }}
        >
          {messageText}
        </div>
      )}
    </div>
  );
};

export default SOSmsg;