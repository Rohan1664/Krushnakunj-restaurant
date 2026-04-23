import React from "react";
import { Link } from "react-router-dom";

const LinkButton = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="text-gray-400 hover:text-black transition"
    >
      {children}
    </Link>
  );
};

export default LinkButton;