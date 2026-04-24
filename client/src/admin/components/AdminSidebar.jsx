import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Text, Button } from "../../components/ui";

const AdminSidebar = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded transition ${isActive
      ? "bg-orange-500 text-white"
      : "text-gray-300 hover:bg-gray-700"
    }`;

  return (
    <div
      className="
      w-64 bg-gray-900 text-white
      max-h-[200vh] md:h-screen
      flex flex-col"

    >
      {/* HEADER */}
      <div className="p-6 border-b border-gray-700">
        <Text variant="title" className="text-orange-500">
          Admin Panel
        </Text>
      </div>

      {/* NAV */}
      <nav className="flex-1 space-y-2 px-4 py-4 overflow-y-auto">
        <NavLink to="/admin/dashboard" className={linkClass} onClick={onClose}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" className={linkClass} onClick={onClose}>
          Products
        </NavLink>

        <NavLink to="/admin/add-product" className={linkClass} onClick={onClose}>
          Add Product
        </NavLink>

        <NavLink to="/admin/orders" className={linkClass} onClick={onClose}>
          Orders
        </NavLink>

        <NavLink to="/admin/users" className={linkClass} onClick={onClose}>
          Users
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-gray-700">
        <Button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;