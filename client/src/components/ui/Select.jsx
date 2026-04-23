import React from "react";

const Select = ({ className = "", children, ...props }) => {
  return (
    <select
      className={`w-full p-3 border rounded outline-none focus:ring-2 focus:ring-orange-400 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;