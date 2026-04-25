import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Text, Button, Section, NavLinkButton } from "../../components/ui";

const AdminSidebar = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `
    block px-4 py-2 rounded-md transition font-medium
    ${
      isActive
        ? "bg-[#C62828] text-white"
        : "text-gray-300 hover:bg-white-800 hover:text-white"
    }
  `;

  return (
    <Section variant="primary"
      className=" w-64 max-h-[200vh] md:h-screen flex flex-col"
    >
      {/* HEADER */}
      <div className="p-6 border-b border-gray-700">
        <Text variant="subtitle" color="light">
          Admin Panel
        </Text>
      </div>

      {/* NAV */}
      <nav className="flex-1 space-y-2 px-4 py-4 overflow-y-auto">
        <NavLinkButton to="/admin/dashboard" variant="default" className={linkClass} onClick={onClose}>
          Dashboard
        </NavLinkButton>

        <NavLinkButton to="/admin/products" variant="default" className={linkClass} onClick={onClose}>
          Products
        </NavLinkButton>

        <NavLinkButton to="/admin/add-product" variant="default" className={linkClass} onClick={onClose}>
          Add Product
        </NavLinkButton>

        <NavLinkButton to="/admin/orders" variant="default" className={linkClass} onClick={onClose}>
          Orders
        </NavLinkButton>

        <NavLinkButton to="/admin/users" variant="default" className={linkClass} onClick={onClose}>
          Users
        </NavLinkButton>
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-gray-700">
        <Button
          variant="primary"
          className="w-full"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </Section>
  );
};

export default AdminSidebar;