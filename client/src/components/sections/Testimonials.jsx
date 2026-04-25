import React from "react";
import { Card, Text, Section, Container } from "../ui";

const testimonials = [
  {
    name: "Rahul Sharma",
    review: "Amazing food and super fast delivery! Highly recommended.",
  },
  {
    name: "Priya Verma",
    review: "The taste is शानदार 😍 I order almost every week!",
  },
  {
    name: "Amit Patel",
    review: "Great quality at affordable prices. Loved it!",
  },
];

const Testimonials = () => {
  return (
    <Section className="bg-gray-100 py-16 text-center" variant="primary">
      <Container >

        {/* HEADER */}
        <Text variant="title" color="light" className="mb-10">
          What Our Customers Say
        </Text>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {testimonials.map((item, index) => (
            <Card key={index} className="p-6 text-left">

              <Text
                color="muted"
                className="italic"
              >
                "{item.review}"
              </Text>

              <Text
                variant="subtitle"
                color="dark"
                className="mt-4"
              >
                - {item.name}
              </Text>

            </Card>
          ))}

        </div>

      </Container>
    </Section>
  );
};

export default Testimonials;