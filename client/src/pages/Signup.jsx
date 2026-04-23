import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
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
    <div className="pt-16">

      {/* HEADER */}
      <Header
        title="Signup"
        subtitle="Create your premium account ✨"
        bgImage="/images/hero/signup.jpg"
      />

      <Section className="bg-gradient-to-br from-orange-50 to-gray-100">
        <Container className="flex justify-center items-center min-h-[70vh]">

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-8 rounded-2xl shadow-xl backdrop-blur-md bg-white/80 border border-gray-200 space-y-5"
          >

            {/* TITLE */}
            <Text variant="title" className="text-center text-orange-500">
              Create Account
            </Text>

            {/* NAME */}
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="focus:ring-2 focus:ring-orange-400"
              required
            />

            {/* EMAIL */}
            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder=" Email Address"
              type="email"
              className="focus:ring-2 focus:ring-orange-400"
              required
            />

            {/* PASSWORD */}
            <div className="relative">
              <Input
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder=" Password"
                type={showPassword ? "text" : "password"}
                className="focus:ring-2 focus:ring-orange-400 pr-10"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
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
                placeholder=" Confirm Password"
                type={showConfirm ? "text" : "password"}
                className="focus:ring-2 focus:ring-orange-400 pr-10"
                required
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
              >
                {showConfirm ? "🙈" : "👁"}
              </span>
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 text-lg shadow-md hover:scale-105 transition"
            >
               Signup
            </Button>

            {/* FOOTER */}
            <Text className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-500 font-semibold hover:underline"
              >
                Login
              </Link>
            </Text>

          </form>

        </Container>
      </Section>

    </div>
  );
};

export default Signup;