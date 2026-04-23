import React from "react";

const Header = ({ title, subtitle, bgImage }) => {
  return (
    <div
      className="w-full h-[300px] flex items-center justify-center text-center text-white relative"
      style={{
        backgroundImage: `url(${ "/images/hero/default.jpeg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 px-4">
        <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
        {subtitle && (
          <p className="mt-3 text-lg text-gray-200">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default Header;