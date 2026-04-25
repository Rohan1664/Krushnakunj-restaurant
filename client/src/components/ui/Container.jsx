import React from "react";

const Container = ({
  children,
  className = "",
  size = "default",   // sm | default | lg | full
  variant = "transparent", // white | gray | primary | transparent
}) => {
  const sizes = {
    sm: "max-w-3xl",
    default: "max-w-5xl",
    lg: "max-w-7xl",
    full: "max-w-full",
  };

  const variants = {
    transparent: "",
    primary: "bg-[#f3f0e6]",
  };

  return (
    <div
      className={`
        ${sizes[size]}
        ${variants[variant]}
        mx-auto px-4
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;