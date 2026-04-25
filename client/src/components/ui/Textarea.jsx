import React from "react";

const Textarea = ({
  className = "",
  variant = "default",
  ...props
}) => {
  const variants = {
    default:
      "w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400",
    outline:
      "w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400",
    soft:
      "w-full p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-orange-400",
  };

  return (
    <textarea
      {...props}
      className={`${variants[variant]} ${className}`}
    />
  );
};

export default Textarea;