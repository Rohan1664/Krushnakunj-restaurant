import React from "react";
import { NavLink } from "react-router-dom";

const NavLinkButton = ({
  to,
  children,
  className = "",
  variant = "default", // default | pill | underline
  onClick,
}) => {
  const baseStyle =
    "transition font-medium";

  const variants = {
    default: "text-red-800 hover:text-red-900 bg-transparent",
  };

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `
        ${baseStyle}
        ${variants[variant]}
        ${isActive ? "text-orange-500 font-semibold" : ""}
        ${className}
        `
      }
    >
      {children}
    </NavLink>
  );
};

export default NavLinkButton;