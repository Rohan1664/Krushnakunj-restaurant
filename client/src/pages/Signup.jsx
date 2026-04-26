import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signupUser } from "../services/authService";

import {
  Section,
  Container,
  Input,
  Button,
  Text,
} from "../components/ui";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await signupUser(form);
      alert("Signup successful");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Section className="min-h-screen flex items-center bg-gray-100">
      <Container size="lg">

        <div className="grid md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* LEFT SIDE - FORM */}
          <div className="p-8 md:p-12 space-y-12 flex flex-col justify-center">

            <Text variant="title" className="text-orange-500">
              Create Account
            </Text>

            <form onSubmit={handleSubmit} className="space-y-6">

              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />

              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                type="email"
                required
              />

              {/* PASSWORD */}
              <div className="relative">
                <Input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className="pr-10"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showPassword ? "🙈" : "👁"}
                </span>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="relative">
                <Input
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  type={showConfirm ? "text" : "password"}
                  className="pr-10"
                  required
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showConfirm ? "🙈" : "👁"}
                </span>
              </div>

              <Button type="submit" className="w-full py-3 text-lg">
                Signup
              </Button>

            </form>

            <Text variant="small" color="muted">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500 font-semibold">
                Login
              </Link>
            </Text>
          </div>

          {/* RIGHT SIDE - IMAGE */}
          <div className="hidden md:block relative">

            {/* IMAGE */}
            <img
              src="/images/hero/signup.png"
              alt="Signup"
              className="w-full h-full object-cover"
            />

            {/* OVERLAY */}
            {/* <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center">

              <Text
                color="primary"
                variant="title"
                as="h2"
                className="text-white"
              >
                Signup
              </Text>

              <Text
                variant="subtitle"
                as="p"
                color="primary"
                className="mt-2 max-w-md"
              >
                Create your account at कृष्णकुंज{" "}
                <span className="mx-1">and</span>{" "}
                start your delicious journey with us!
              </Text>

            </div> */}

          </div>

        </div>

      </Container>
    </Section>
  );
};

export default Signup;