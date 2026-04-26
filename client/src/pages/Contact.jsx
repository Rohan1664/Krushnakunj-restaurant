import React, { useState } from "react";
import Header from "../components/layout/Header";
import {
  Section,
  Container,
  Text,
  Form,
  Input,
  Textarea,
  Button,
} from "../components/ui";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
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
    console.log(form);

    alert("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="pt-16">

      {/* Header */}
      <Header
        title="Contact Us"
        subtitle="We’d love to hear from you"
        bgImage="/images/hero/hero.png"
      />

      {/* Contact Section */}
      <Section className="bg-white">
        <Container className="grid md:grid-cols-2 gap-10">

          {/* FORM */}
          <div>
            <Text variant="subtitle" className="mb-4">
              Send Message
            </Text>

            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <Textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
              />

              <Button type="submit" variant="primary">
                Send Message
              </Button>
            </Form>
          </div>

          {/* INFO */}
          <div className="flex flex-col justify-center">
            <Text variant="subtitle" className="mb-4">
              Get in Touch
            </Text>

            <Text className="mb-3">📧 support@krushnakunj.com</Text>
            <Text className="mb-3">📞 +91 98765 43210</Text>
            <Text>📍 India</Text>
          </div>

        </Container>
      </Section>

    </div>
  );
};

export default Contact;