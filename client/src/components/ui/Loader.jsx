import React from "react";

const Loader = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div
        style={{
          width: "30px",
          height: "30px",
          border: "3px solid #f97316",
          borderTop: "3px solid transparent",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "auto",
        }}
      />

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;