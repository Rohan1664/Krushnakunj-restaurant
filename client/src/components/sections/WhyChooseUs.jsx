import React from "react";
import { Card ,Section} from "../ui";

const features = [
  {
    title: "Fresh Ingredients",
    desc: "We use only fresh and high-quality ingredients for every dish.",
    icon: "🥗",
  },
  {
    title: "Fast Delivery",
    desc: "Get your food delivered quickly at your doorstep.",
    icon: "🚀",
  },
  {
    title: "Best Taste",
    desc: "Delicious recipes crafted by top chefs.",
    icon: "😋",
  },
  {
    title: "Affordable Prices",
    desc: "Enjoy premium food at pocket-friendly prices.",
  },
];

const WhyChooseUs = () => {
  return (
    <Section className="py-16 bg-gray-100 text-center" variant="primary">
      <h2 className="text-3xl font-bold mb-10">Why Choose Us</h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-4">
        {features.map((item, index) => (
          <Card key={index} className="p-6 text-center">
            <div className="text-4xl mb-4">{item.icon}</div>

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