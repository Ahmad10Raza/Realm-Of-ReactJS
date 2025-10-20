import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function QRGenerator() {
  const [text, setText] = useState("");
  const [qrValue, setQrValue] = useState("");

  const handleGenerate = () => {
    setQrValue(text);
  };

  const handleDownload = () => {
  const canvas = document.querySelector("canvas");
  const link = document.createElement("a");
  link.download = "qrcode.png";
  link.href = canvas.toDataURL();
  link.click();
};


  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f2f2f2",
      }}
    >
      <h1>QR Code Generator</h1>

      <input
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "300px",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={handleGenerate}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Generate QR
      </button>

      {qrValue && (
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <QRCodeCanvas value={qrValue} size={200} />
          <p style={{ marginTop: "10px", wordBreak: "break-all" }}>{qrValue}</p>

          <button onClick={handleDownload}>Download QR</button>

        </div>
      )}
    </div>
  );
}

export default QRGenerator;
