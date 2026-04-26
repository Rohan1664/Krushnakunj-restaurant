import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const [showPassword, setShowPassword] = useState(false);

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
    <Section className="min-h-screen flex items-center bg-gray-100">
      <Container size="lg">

        <div className="grid md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* LEFT - FORM */}
          <div className="p-8 md:p-12 space-y-8 flex flex-col justify-center">

            <Text variant="title" className="text-orange-500">
              Welcome Back 
            </Text>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* EMAIL */}
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

              {/* BUTTON */}
              <Button type="submit" className="w-full py-3 text-lg">
                Login
              </Button>

            </form>

            {/* FOOTER */}
            <Text variant="small" color="muted">
              Don't have an account?{" "}
              <Link to="/signup" className="text-orange-500 font-semibold">
                Signup
              </Link>
            </Text>

          </div>

          {/* RIGHT - IMAGE */}
          <div className="hidden md:block relative">

            <img
              src="/images/hero/login.png"
              alt="Login"
              className="w-full h-full object-cover"
            />

            {/* OPTIONAL OVERLAY */}
            {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Text variant="subtitle" color="primary" as="h2">
                Welcome Back to कृष्णकुंज!
              </Text>
            </div> */}

          </div>

        </div>

      </Container>
    </Section>
  );
};

export default Login;