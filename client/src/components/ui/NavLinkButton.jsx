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
    default: "text-gray-700 hover:text-orange-500",
    pill:
      "px-3 py-1 rounded-full hover:bg-orange-100 text-gray-700 hover:text-orange-600",
    underline:
      "text-gray-700 hover:text-orange-500 border-b-2 border-transparent hover:border-orange-500",
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