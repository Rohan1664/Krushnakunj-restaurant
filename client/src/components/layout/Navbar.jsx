import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, NavLinkButton } from "../ui";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Menu", to: "/menu" },
    { name: "About", to: "/about" },
    { name: "Gallery", to: "/gallery" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-orange-500">
          krushnakunj
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <NavLinkButton key={item.to} to={item.to}>
              {item.name}
            </NavLinkButton>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center space-x-3">

          {/* USER INFO */}
          {user ? (
            <div className="flex items-center gap-3">

              <div className="text-right">
                <p className="font-semibold text-gray-700">
                  {user.name}
                </p>

                {user.isAdmin && (
                  <p className="text-xs text-orange-500 font-bold">
                    ADMIN
                  </p>
                )}
              </div>

              {/* 🛡 ADMIN BUTTON */}
              {user?.isAdmin && (
                <Button
                  variant="primary"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Admin Panel
                </Button>
              )}


              <Button variant="primary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="primary">Login</Button>
              </Link>

              <Link to="/signup">
                <Button variant="primary">Signup</Button>
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 shadow">

          {navItems.map((item) => (
            <NavLinkButton key={item.to} to={item.to} className="block">
              {item.name}
            </NavLinkButton>
          ))}

          {/* ADMIN BUTTON */}
          {user?.isAdmin && (
            <Button
              className="w-full"
              variant="primary"
              onClick={() => navigate("/admin/dashboard")}
            >
              Admin Panel
            </Button>
          )}

          {user && (
            <Button
              variant="primary"
              className="w-full mt-2"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;