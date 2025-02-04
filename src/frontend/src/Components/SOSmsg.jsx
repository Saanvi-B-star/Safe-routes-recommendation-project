import React from 'react'

const SOSmsg = () => {
  return (
    <div>
        <button
          // onClick={handleEndJourneyClick}
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