import React from "react";
import { Link } from "react-router-dom";

const LinkButton = ({
  to,
  children,
  variant = "default",
  className = "",
}) => {
  const styles = {
    default: "text-gray-500 hover:text-black transition",
    primary: "text-orange-500 hover:text-orange-600 font-medium transition",
    danger: "text-red-500 hover:text-red-600 transition",
    underline: "text-gray-700 hover:underline transition",
  };

  return (
    <Link to={to} className={`${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
};

export default LinkButton;