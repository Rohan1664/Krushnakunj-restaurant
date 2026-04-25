import React from "react";

const Loader = ({
  size = "md", // sm | md | lg
  color = "#f97316",
  fullScreen = false,
}) => {
  const sizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "h-screen w-full" : "p-4"
      }`}
    >
      <div
        className={`${sizes[size]} border-4 border-t-transparent rounded-full animate-spin`}
        style={{ borderColor: color, borderTopColor: "transparent" }}
      />
    </div>
  );
};

export default Loader;