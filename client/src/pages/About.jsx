import React from "react";
import Header from "../components/layout/Header";
import { Section, Container, Text } from "../components/ui";

const About = () => {
  return (
    <div className="pt-16">

      {/* Header */}
      <Header
        title="About Us"
        subtitle="Know more about our journey"
        bgImage="/images/hero/about.jpg"
      />

      {/* Content */}
      <Section className="bg-white">
        <Container className="text-center">

          <Text variant="title" className="mb-6">
            Welcome to krushnakunj 🍽️
          </Text>

          <Text className="mb-4">
            krushnakunj is your go-to platform for delicious and freshly prepared meals.
            We are passionate about delivering high-quality food with great taste.
          </Text>

          <Text className="mb-4">
            Our chefs use the best ingredients to craft mouth-watering dishes that
            satisfy your cravings. Whether it's a quick snack or a full meal,
            we've got you covered.
          </Text>

          <Text>
            Our mission is simple — to bring happiness through food ❤️
          </Text>

        </Container>
      </Section>

    </div>
  );
};

export default About;