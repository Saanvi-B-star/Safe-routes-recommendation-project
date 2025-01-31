import { useState } from "react";
import "../Style/Feedback.css";

function Feedback() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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

            <label>How safe did you feel on this route?</label>
            <select required>
              {/* <option value="">Select</option> */}
              <option value="very_safe">Very Safe</option>
              <option value="moderate">Moderate</option>
              <option value="unsafe">Unsafe</option>
            </select>

            <label>How well-lit was the route?</label>
            <select required>
              {/* <option value="">Select</option> */}
              <option value="well_lit">Well Lit</option>
              <option value="dim">Dimly Lit</option>
              <option value="dark">Dark</option>
            </select>

            <label>Did you notice any suspicious activity?</label>
            <select required>
              {/* <option value="">Select</option> */}
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>

            <label>Was there any police/security presence?</label>
            <select required>
              {/* <option value="">Select</option> */}
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <label>Was the route crowded?</label>
            <select required>
              {/* <option value="">Select</option> */}
              <option value="crowded">Yes, it was crowded</option>
              <option value="moderate">Moderately crowded</option>
              <option value="isolated">No, it was isolated</option>
            </select>

            <label>How was the road condition?</label>
            <select required>
              {/* <option value="">Select</option> */}
              <option value="good">Good</option>
              <option value="average">Average</option>
              <option value="bad">Bad</option>
            </select>

            <label>Additional Feedback</label>
            <textarea placeholder="Enter your feedback here..." required></textarea>

            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Feedback;
