import React from "react";
import { theme } from "../../styles/theme";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl ${className}`}
      style={{
        background: "#fffefd",
        borderRadius: theme.radius.lg,
        boxShadow: theme.shadow.md,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

export default Card;