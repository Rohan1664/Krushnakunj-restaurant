import React from "react";
import { theme } from "../../styles/theme";

const Button = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
}) => {
  const styles = {
    primary: {
      background: theme.colors.primary,
      color: "#fff",
    },
    dark: {
      background: theme.colors.dark,
      color: "#fff",
    },
    outline: {
      background: "transparent",
      border: "2px solid #ddd",
      color: "#ffffff",
    },
    danger: {
      background: theme.colors.danger,
      color: "#fff",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      style={{
        padding: "10px 16px",
        borderRadius: theme.radius.md,
        cursor: "pointer",
        border: "none",
        transition: "0.2s",
        ...styles[variant],
      }}
    >
      {children}
    </button>
  );
};

export default Button;