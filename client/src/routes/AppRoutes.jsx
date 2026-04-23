import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

// User Pages
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import About from "../pages/About";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";
import OrderNow from "../pages/OrderNow";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

// Admin Pages
import Dashboard from "../admin/Dashboard";
import Products from "../admin/Products";
import AddProduct from "../admin/AddProduct";
import EditProduct from "../admin/EditProduct";
import Orders from "../admin/Orders";
import Users from "../admin/Users";

// Layouts
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AdminLayout from "../admin/AdminLayout";

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  // 🔐 Admin Protection
  const AdminRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" />;
    if (!user.isAdmin) return <Navigate to="/" />;
    return children;
  };

  // 🔐 Auth protection
  const AuthRoute = ({ children }) => {
    return user ? <Navigate to="/" /> : children;
  };

  return (
    <Router>
      <Routes>

        {/* ================= USER ROUTES ================= */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/menu"
          element={
            <>
              <Navbar />
              <Menu />
              <Footer />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/gallery"
          element={
            <>
              <Navbar />
              <Gallery />
              <Footer />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />

        <Route
          path="/order/:id"
          element={
            <>
              <Navbar />
              <OrderNow />
              <Footer />
            </>
          }
        />

        {/* ================= AUTH ROUTES ================= */}
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;