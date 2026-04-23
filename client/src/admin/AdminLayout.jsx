import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AdminSidebar from "./components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />

      <div className="flex flex-1">

        <AdminSidebar />

        {/* 🔥 THIS IS WHERE CONTENT WILL SHOW */}
        <div className="ml-64 w-full p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </div>

      </div>

      <Footer />

    </div>
  );
};

export default AdminLayout;