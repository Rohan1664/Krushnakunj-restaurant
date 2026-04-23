import React from "react";
import { theme } from "../../styles/theme";

const Input = (props) => {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: theme.radius.md,
        border: "1px solid #ddd",
        outline: "none",
      }}
    />
  );
};

export default Input;