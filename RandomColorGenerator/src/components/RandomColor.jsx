import React, { useState } from "react";

function RandomColor() {
  // State to store the current color
  const [color, setColor] = useState("#ffffff"); // default white

  // Function to generate a random hex color
  const generateColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColor);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color,
        transition: "background-color 0.5s",
      }}
    >
      <h1>Random Color Generator</h1>
      <p>Current Color: {color}</p>
      <button
        onClick={generateColor}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Generate Color
      </button>
    </div>
  );
}

export default RandomColor;
