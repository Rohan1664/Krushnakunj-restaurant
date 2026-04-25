import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AdminSidebar from "./components/AdminSidebar";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN AREA */}
      <div className="flex flex-1">

        {/* ✅ MOBILE BACKDROP */}
        {open && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* ✅ SIDEBAR */}
        <div
          className={`
            fixed md:full
            top-20 md:top-0
            left-0
            z-40
            w-64
            h-[calc(100vh-80px)] md:h-auto
            transform transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          <AdminSidebar onClose={() => setOpen(false)} />
        </div>

        {/* ✅ CONTENT */}
        <div className="flex-1 w-full bg-[#f3f0e6] p-4 md:p-6 mt-10">

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden fixed top-20 right-4 z-50 bg-white px-3 py-2 rounded shadow"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? "✕" : "☰"}
          </button>

          {/* PAGE CONTENT */}
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>

        </div>

      </div>

      {/* FOOTER */}
      {/*<Footer /> */}

    </div>
  );
};

export default AdminLayout;