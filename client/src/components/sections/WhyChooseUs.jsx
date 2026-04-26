import React from "react";
import { Card, Section, Text } from "../ui";

const features = [
  {
    title: "Authentic Recipes",
    desc: "Traditional recipes full of flavor",
    icon: "/images/logo/dish.png",
  },
  {
    title: "Family-Friendly Ambience",
    desc: "Get your food delivered quickly at your doorstep.",
    icon: "/images/logo/family.jpeg",
  },
  {
    title: "Customer Satisfaction",
    desc: "Our guests are our top priority",
    icon: "/images/logo/plate.jpeg",
  },
];

const WhyChooseUs = () => {
  return (
    <Section className="py-16 bg-gray-100 text-center" variant="primary">
      <Text variant="title" color="light" className="mb-10">
        Why Choose Us
      </Text>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4">
        {features.map((item, index) => (
          <Card key={index} className="p-6 text-center">
            <img
              src={item.icon}
              alt={item.title}
              className="w-20 h-20 mx-auto mb-4 object-contain block"
            />

            <h3 className="text-xl font-semibold">
              {item.title}
            </h3>

            <p className="text-gray-500 mt-2">
              {item.desc}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default WhyChooseUs;