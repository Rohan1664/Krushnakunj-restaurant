import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui";

const Hero = () => {
  return (
    <section
      className="h-screen bg-cover bg-center flex items-center justify-center text-center text-white relative"
      style={{
        backgroundImage: "url('/images/hero/hero.jpeg')",
      }}
    >
      {/* Overlay */}
      <div className="bg-black bg-opacity-60 absolute inset-0"></div>

      {/* Content */}
      <div className="relative z-10 px-4 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold">
          स्वादिष्ट खाना 🍽️
        </h1>

        <p className="mt-4 text-gray-200">
          Fresh and delicious food delivered fast.
        </p>

        <div className="mt-6 flex gap-4 justify-center">
          <Link to="/menu">
            <Button variant="primary">
              Explore Menu
            </Button>
          </Link>

          <Link to="/contact">
            <Button variant="outline">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;