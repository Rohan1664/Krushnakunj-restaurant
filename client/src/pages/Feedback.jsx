import React, { useState } from "react";
import Header from "../components/layout/Header";

import {
  Section,
  Container,
  Text,
  Input,
  Textarea,
  Select,
  Button,
} from "../components/ui";

const Feedback = () => {
  const [form, setForm] = useState({
    name: "",
    rating: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");

    setForm({
      name: "",
      rating: "",
      message: "",
    });
  };

  return (
    <div className="pt-16">

      <Header
        title="Feedback"
        subtitle="Share your experience with us"
        bgImage="/images/hero/feedback.jpg"
      />

      <Section className="bg-white">
        <Container className="flex justify-center">

          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">

            <Text variant="subtitle" className="text-center">
              Give Feedback
            </Text>

            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <Select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              required
            >
              <option value="">Select Rating</option>
              <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
              <option value="4">⭐⭐⭐⭐ Good</option>
              <option value="3">⭐⭐⭐ Average</option>
              <option value="2">⭐⭐ Poor</option>
              <option value="1">⭐ Very Bad</option>
            </Select>

            <Textarea
              name="message"
              placeholder="Your Feedback"
              value={form.message}
              onChange={handleChange}
              required
            />

            <Button type="submit" variant="primary" className="w-full">
              Submit Feedback
            </Button>

          </form>

        </Container>
      </Section>

    </div>
  );
};

export default Feedback;