import React from 'react'

const SOSmsg = () => {
  const handleSOSClick = async () => {
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
        console.log("SOS Message Sent:", data);
      } else {
        console.error("Failed to send SOS message:", data);
      }
    } catch (error) {
      console.error("Error sending SOS message:", error);
    }
  };


  return (
    <div>
        <button
          // onClick={handleEndJourneyClick}
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
          <i className="fa-solid fa-bell" style={{ fontSize: '1.75rem', marginLeft: '25px', color: 'red'}}></i>
        </button>
    </div>
  )
}

export default SOSmsg;