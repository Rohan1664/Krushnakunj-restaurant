import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AdminSidebar from "./components/AdminSidebar";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">

      {/* TOP NAVBAR */}
      <Navbar />

      {/* MAIN AREA */}
      <div className="flex flex-1 relative">

        {/* BACKDROP (ONLY MOBILE) */}
        {open && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <div
          className={`
            fixed md:relative
            top-20 md:top-0
            left-0
            z-40
            h-full md:h-auto
            transform transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          <AdminSidebar onClose={() => setOpen(false)} />
        </div>

        {/* CONTENT */}
        <div className="flex-1 w-full p-4 md:p-6 bg-gray-100">

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden fixed top-20 right-4 z-50  text-black px-3 py-2 rounded shadow"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>

          <Outlet />
        </div>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default AdminLayout;