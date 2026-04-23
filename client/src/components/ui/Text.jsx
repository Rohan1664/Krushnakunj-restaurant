import React from "react";

const Text = ({ children, variant = "base", className = "" }) => {
  const styles = {
    title: "text-3xl font-bold",
    subtitle: "text-xl font-semibold",
    base: "text-gray-600",
  };

  return (
    <p className={`${styles[variant]} ${className}`}>
      {children}
    </p>
  );
};

export default Text;