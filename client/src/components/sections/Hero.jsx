import React from "react";
import { Link } from "react-router-dom";
import { Button, Text } from "@/components/ui";

const Hero = () => {
  return (
    <section
      className="h-screen bg-cover bg-center flex items-center justify-center text-center relative"
      style={{
        backgroundImage: "url('/images/hero/hero.jpeg')",
      }}
      variant="primary"
    >
      {/* Overlay */}
      <div className="bg-black bg-opacity-60 absolute inset-0"></div>

      {/* Content */}
      <div className="relative z-10 px-4 max-w-2xl">

        <Text variant="title" color="primary">
          स्वादिष्ट खाना 🍽️
        </Text>

        <Text variant="base" color="primary" className="mt-4">
          Fresh and delicious food delivered fast.
        </Text>

        <div className="mt-6 flex gap-4 justify-center">
          <Link to="/menu">
            <Button variant="primary">Explore Menu</Button>
          </Link>

          <Link to="/contact">
            <Button variant="primary">Contact Us</Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Hero;