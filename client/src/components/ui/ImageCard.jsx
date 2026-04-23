import React from "react";

const ImageCard = ({ src, alt = "image" }) => {
  return (
    <div className="overflow-hidden rounded-lg shadow hover:shadow-lg transition">
      <img
        src={src}
        alt={alt}
        className="w-full h-64 object-cover hover:scale-110 transition duration-300"
      />
    </div>
  );
};

export default ImageCard;