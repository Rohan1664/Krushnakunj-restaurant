import React from "react";

const Form = ({
  children,
  onSubmit,
  className = "",
  variant = "default", // default | card | clean
}) => {
  const variants = {
    default: "space-y-4",
    card: "space-y-4 bg-white p-6 rounded-lg shadow-md",
    clean: "space-y-4",
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`${variants[variant]} ${className}`}
    >
      {children}
    </form>
  );
};

export default Form;