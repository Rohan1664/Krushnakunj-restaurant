import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  Section,
  Text,
  Button,
} from "../../components/ui";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded transition ${
      isActive
        ? "bg-orange-500 text-white"
        : "text-gray-300 hover:bg-gray-700"
    }`;

  return (
    <Section className="w-64 h-screen bg-gray-900 text-white fixed p-0">

      {/* HEADER */}
      <div className="p-6 border-b border-gray-700">
        <Text variant="title" className="text-orange-500">
          Admin Panel
        </Text>
      </div>

      {/* NAV LINKS */}
      <nav className="space-y-2 px-4 py-4">

        <NavLink to="/admin/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" className={linkClass}>
          Products
        </NavLink>

        <NavLink to="/admin/add-product" className={linkClass}>
          Add Product
        </NavLink>

        <NavLink to="/admin/orders" className={linkClass}>
          Orders
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          Users
        </NavLink>

      </nav>

      {/* LOGOUT */}
      <div className="px-4 mt-4">
        <Button
          variant="primary"
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600"
        >
          Logout
        </Button>
      </div>

    </Section>
  );
};

export default AdminSidebar;