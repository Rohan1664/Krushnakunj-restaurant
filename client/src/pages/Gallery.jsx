import React from "react";
import Header from "../components/layout/Header";

import {
  Section,
  Container,
  ImageCard,
} from "../components/ui";

const images = [
  "/images/dishes/pizza.jpg",
  "/images/dishes/burger.jpg",
  "/images/dishes/pasta.jpg",
  "/images/dishes/cake.jpg",
  "/images/dishes/paneer.jpg",
  "/images/dishes/fries.jpg",
];

const Gallery = () => {
  return (
    <div className="pt-16">

      <Header
        title="Gallery"
        subtitle="A glimpse of our delicious food"
        bgImage="/images/hero/hero.png"
      />

      <Section className="bg-gray-100">
        <Container>
          <div className="grid md:grid-cols-3 gap-6">

            {images.map((img, index) => (
              <ImageCard key={index} src={img} alt="food" />
            ))}

          </div>
        </Container>
      </Section>

    </div>
  );
};

export default Gallery;