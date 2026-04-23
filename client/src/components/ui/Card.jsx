import React from "react";
import { theme } from "../../styles/theme";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={className}
      style={{
        background: "#fff",
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