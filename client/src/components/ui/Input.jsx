import React from "react";
import { theme } from "../../styles/theme";

const Input = ({
  className = "",
  variant = "default", // default | error | success
  ...props
}) => {
  const variants = {
    default: {
      border: "1px solid #ddd",
    },
    error: {
      border: "1px solid #ef4444",
    },
    success: {
      border: "1px solid #22c55e",
    },
  };

  return (
    <input
      {...props}
      className={className}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: theme.radius.md,
        outline: "none",
        transition: "0.2s",
        fontSize: "14px",

        ...variants[variant],

        // focus styling
        boxShadow: "none",
      }}
      onFocus={(e) => {
        e.target.style.borderColor = theme.colors.primary;
        e.target.style.boxShadow = "0 0 0 3px rgba(198,40,40,0.15)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = variants[variant].border.split(" ")[2];
        e.target.style.boxShadow = "none";
      }}
    />
  );
};

export default Input;