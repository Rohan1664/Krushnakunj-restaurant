import React from "react";

const Select = ({
  className = "",
  variant = "default", // default | outline | soft
  size = "md", // sm | md | lg
  ...props
}) => {
  const variants = {
    default:
      "border border-gray-300 bg-white focus:ring-2 focus:ring-orange-400",
    outline:
      "border-2 border-orange-400 bg-transparent focus:ring-2 focus:ring-orange-300",
    soft:
      "border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-orange-300",
  };

  const sizes = {
    sm: "p-2 text-sm",
    md: "p-3 text-base",
    lg: "p-4 text-lg",
  };

  return (
    <select
      className={`
        w-full
        rounded
        outline-none
        transition
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {props.children}
    </select>
  );
};

export default Select;