import React from "react";
import { Link } from "react-router-dom";

const NavLinkButton = ({ to, children, className = "" }) => {
  return (
    <Link
      to={to}
      className={`text-gray-700 hover:text-orange-500 transition ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLinkButton;