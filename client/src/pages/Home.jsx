import React from "react";
import Header from "../components/layout/Header";

// Sections
import Hero from "../components/sections/Hero";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import PopularDishes from "../components/sections/PopularDishes";
import Testimonials from "../components/sections/Testimonials";

const Home = () => {
  return (
    <div className="pt-16">
      
      {/* Hero Section */}
      <Hero />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Popular Dishes */}
      <PopularDishes />

      {/* Testimonials */}
      <Testimonials />

    </div>
  );
};

export default Home;