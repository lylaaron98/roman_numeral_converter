import React, { useState } from "react";
import "./App.css";

function RomanConverter() {
  const [romanNumeral, setRomanNumeral] = useState("");
  const [arabicNumber, setArabicNumber] = useState("");
  const [error, setError] = useState(null);

  const convertToArabic = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/convert?romanNumeral=${romanNumeral}`
      );
      if (response.ok) {
        const data = await response.json();
        setArabicNumber(data.arabicNumber);
        setError(null); // Clear any previous errors
      } else {
        const data = await response.json();
        setError(data.error);
        setArabicNumber(""); // Clear the previous result
      }
    } catch (error) {
      setError("An error occurred while processing the request.");
      setArabicNumber(""); // Clear the previous result
    }
  };

  return (
    <div>
      <h1>Roman Numeric Converter</h1>
      <div>
        Roman Numeral:{" "}
        <input
          type="text"
          value={romanNumeral}
          onChange={(e) => setRomanNumeral(e.target.value)}
        />
        <button onClick={convertToArabic}>Convert</button>
      </div>
      {error && <div className="error">{error}</div>}
      {arabicNumber && <div>Arabic Number: {arabicNumber}</div>}
    </div>
  );
}

export default RomanConverter;
