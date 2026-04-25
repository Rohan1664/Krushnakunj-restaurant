import React from "react";
import { Text } from "../ui";

const Header = ({ title, subtitle, bgImage }) => {
  return (
    <div
      className="w-full h-[300px] flex items-center justify-center text-center relative"
      style={{
        backgroundImage: `url(${bgImage || "/images/hero/default.jpeg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 px-4 max-w-3xl">
        
        {/* TITLE */}
        <Text
          as="h1"
          variant="title"
          color="light"
        >
          {title}
        </Text>

        {/* SUBTITLE */}
        {subtitle && (
          <Text
            as="p"
            variant="subtitle"
            color="muted"
            className="mt-3"
          >
            {subtitle}
          </Text>
        )}

      </div>
    </div>
  );
};

export default Header;