import React from "react";
import { Card } from "../ui";

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
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-10">
        What Our Customers Say
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-4">
        {testimonials.map((item, index) => (
          <Card key={index} className="p-6 text-left">
            <p className="text-gray-600 italic">
              "{item.review}"
            </p>

            <h3 className="mt-4 font-semibold text-orange-500">
              - {item.name}
            </h3>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;