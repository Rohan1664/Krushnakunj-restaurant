import React from "react";
import { Link } from "react-router-dom";
import { Section, Text, Container } from "../ui";

const Footer = () => {
  return (
    <Section variant="primary" className="py-10 ">
      
      <Container size="lg">

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">

          {/* BRAND */}
          <div>
            <Text variant="subtitle" color="light" as="h1">
              krushnakunj
            </Text>

            <Text variant="small" color="muted" className="mt-3">
              Delicious food delivered to your doorstep. Fresh, fast, and tasty!
            </Text>
          </div>

          {/* QUICK LINKS */}
          <div>
            <Text variant="subtitle" color="light" as="h3" className="mb-3">
              Quick Links
            </Text>

            <Text variant="small" color="muted" className="space-y-2">
              <Text as="p" color="muted">
                <Link to="/">Home</Link>
              </Text>

              <Text as="p" color="muted">
                <Link to="/menu">Menu</Link>
              </Text>

              <Text as="p" color="muted">
                <Link to="/about">About</Link>
              </Text>

              <Text as="p" color="muted">
                <Link to="/contact">Contact</Link>
              </Text>
            </Text>
          </div>

          {/* CONTACT */}
          <div>
            <Text variant="subtitle" color="light" as="h3" className="mb-3">
              Contact
            </Text>

            <div className="space-y-2">
              <Text variant="small" color="muted">
                Email: support@krushnakunj.com
              </Text>

              <Text variant="small" color="muted">
                Phone: +91 98765 43210
              </Text>

              <Text variant="small" color="muted">
                Location: India
              </Text>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <Text variant="small" color="muted">
            © {new Date().getFullYear()} krushnakunj. All rights reserved.
          </Text>
        </div>

      </Container>
    </Section>
  );
};

export default Footer;