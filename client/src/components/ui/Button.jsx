import React from "react";

const Button = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) => {
  const base =
    "px-4 py-2 rounded-md font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

 const variants = {
   primary: "bg-[#C62828] text-[#FAF9F6] hover:bg-[#C62828]",

  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;