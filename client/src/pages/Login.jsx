import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

import {
  Section,
  Container,
  Text,
  Input,
  Button,
} from "../components/ui";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // 👈 NEW

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser(form);

      login(data);

      if (data.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="pt-16">

      <Header
        title="Login"
        subtitle="Access your account"
        bgImage="/images/hero/login.jpg"
      />

      <Section className="bg-gray-100">
        <Container className="flex justify-center">

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded shadow w-full max-w-md space-y-4"
          >

            <Text variant="subtitle" className="text-center">
              Login
            </Text>

            {/* EMAIL */}
            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              required
            />

            {/* PASSWORD WITH TOGGLE */}
            <div className="relative">
              <Input
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                type={showPassword ? "text" : "password"} // 👈 TOGGLE
                required
              />

              {/* SHOW / HIDE BUTTON */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-black"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Login
            </Button>

            <Text className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-orange-500">
                Signup
              </Link>
            </Text>

          </form>

        </Container>
      </Section>

    </div>
  );
};

export default Login;