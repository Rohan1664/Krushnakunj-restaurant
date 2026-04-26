import React from "react";

const Section = ({
  children,
  className = "",
  variant = "primary", // white | gray | primary | dark | transparent
}) => {
  const variants = {
    transparent: "",
    primary: "bg-[#f6f3ec]",
  };

  return (
    <section
      className={`
        py-16
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </section>
  );
};

export default Section;