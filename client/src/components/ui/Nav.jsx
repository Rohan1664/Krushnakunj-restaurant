import React from "react";

const Nav = ({
  children,
  variant = "primary", 
  className = "",
  fixed = true,
}) => {
  const variants = {
    primary: "bg-[#f3f0e6]",
  };

  return (
    <nav
      className={`
        w-full z-50
        ${fixed ? "fixed top-0 left-0" : ""}
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </nav>
  );
};

export default Nav;