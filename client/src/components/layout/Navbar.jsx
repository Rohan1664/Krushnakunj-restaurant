import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, NavLinkButton, Text, Container,Nav  } from "../ui";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Menu", to: "/menu" },
    { name: "About", to: "/about" },
    { name: "Gallery", to: "/gallery" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <Nav variant="primary" className="fixed w-full z-50">
      <Container size="lg" className="py-3 flex justify-between items-center">

        {/* LOGO (NOW USING TEXT UI) */}
        <Link to="/">
          <Text variant="title" color2="red" >
            कृष्णकुंज
          </Text>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <NavLinkButton
              key={item.to}
              to={item.to}
              variant="default"
            >
              {item.name}
            </NavLinkButton>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center space-x-3">

          {user ? (
            <>
              {/* USER INFO */}
              <div className="text-right">
                <Text variant="base" className="font-semibold text-gray-700">
                  {user.name}
                </Text>

                {user.isAdmin && (
                  <Text variant="small" className="text-orange-500 font-bold">
                    ADMIN
                  </Text>
                )}
              </div>

              {/* ADMIN BUTTON */}
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
            </>
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

        {/* MOBILE BUTTON */}
        <button
          ref={buttonRef}
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </Container>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-white px-4 pb-4 pt-2 space-y-3 shadow-lg"
        >
          {navItems.map((item) => (
            <NavLinkButton
              key={item.to}
              to={item.to}
              className="block w-full"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </NavLinkButton>
          ))}

          {user ? (
            <div className="space-y-2 pt-2 border-t">
              <Text variant="base" className="font-semibold">
                {user.name}
              </Text>

              {user?.isAdmin && (
                <Button
                  className="w-full"
                  variant="primary"
                  onClick={() => {
                    navigate("/admin/dashboard");
                    setMenuOpen(false);
                  }}
                >
                  Admin Panel
                </Button>
              )}

              <Button
                className="w-full"
                variant="primary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="space-y-2 pt-2 border-t">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button className="w-full" variant="primary">
                  Login
                </Button>
              </Link>

              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <Button className="w-full" variant="primary">
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </Nav>
  );
};

export default Navbar;