import React from "react";

const Text = ({
  children,
  variant = "base",
  color = "light", // dark | light | muted | primary
  className = "",
  as = "p",
}) => {
  const Component = as;

  const variants = {
    title: "text-4xl md:text-4xl font-bold",
    subtitle: "text-xl md:text-3xl font-semibold",
    base: "text-base",
    small: "text-xl text-sm md:text-0xl",
    xxl: "text-5xl md:text-7xl font-bold",
  };

  const colors = {
    dark: "text-gray-900",
    light: "text-red-800",
    muted: "text-gray-900",
    primary: "text-[#FAF9F6]",
  };

  return (
    <Component
      className={`${variants[variant]} ${colors[color]} ${className}`}
    >
      {children}
    </Component>
  );
};

export default Text;