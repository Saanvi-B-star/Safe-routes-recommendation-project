import { lazy, useState } from "react";
import "../Style/Feedback.css";
import axios from "axios";

function Feedback() {
  const [submitted, setSubmitted] = useState(false);
  const [issue, setIssue] = useState("");
  const [issueType, setIssueType] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
      try {
        const res = await axios.post("http://localhost:5000/feedback", { issue,location,issueType });

    } catch (err) {
        if (err.response && err.response.status === 404) {
            console.log("Error 1");
        } else {
          console.log("Error 2");
        }
    }
  };

  return (
    <div className="feedback-container">
      <div className="overlay"></div>
      <div className="feedback-form-box">
        {submitted ? (
          <h2 className="thank-you">Thank you for your feedback!</h2>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Feedback on Your Route</h2>

            <label>How well-lit was the route?</label>
            <select required>
            <option value="" disabled hidden>Select</option>
              {/* <option value="">Select</option> */}
              <option value="well_lit">Well Lit</option>
              <option value="dim">Dimly Lit</option>
              <option value="dark">Dark</option>
            </select>

            <label>Was there any police/security presence?</label>
            <select required>
            <option value="" disabled hidden>Select</option>
              {/* <option value="">Select</option> */}
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <label>Was the route crowded?</label>
            <select required>
            <option value="" disabled hidden>Select</option>
              {/* <option value="">Select</option> */}
              <option value="crowded">Yes, it was crowded</option>
              <option value="moderate">Moderately crowded</option>
              <option value="isolated">No, it was isolated</option>
            </select>

            <label>Did you face any issue ?</label>
            <select value={issue} onChange={(e)=>setIssue(e.target.value)} required>
            <option value="" disabled hidden>Select</option>
              {/* <option value="">Select</option> */}
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <label>What kind of issue was it ?</label>
            <select value={issueType} onChange={(e)=>setIssueType(e.target.value)}>
              {/* <option value="">Select</option> */}
              <option value="" disabled hidden>Select</option>
              <option value="construction">Construction</option>
              <option value="potholes">Potholes</option>
            </select>

            <label>Location of the issue faced : </label>
            <textarea placeholder="Enter the location" value={location} onChange={(e)=>setLocation(e.target.value)}/>

            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Feedback;
