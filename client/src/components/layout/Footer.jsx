import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">

      <div className="
        max-w-7xl mx-auto px-4
        py-6 md:py-10
        grid gap-6 md:gap-8
        grid-cols-1 md:grid-cols-3
      ">

        {/* Brand */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-orange-500">
            krushnakunj
          </h2>

          <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-400">
            Delicious food delivered to your doorstep. Fresh, fast, and tasty!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
            Quick Links
          </h3>

          <ul className="space-y-1 md:space-y-2 text-sm md:text-base text-gray-400">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
            Contact
          </h3>

          <div className="text-sm md:text-base text-gray-400 space-y-1">
            <p>Email: support@krushnakunj.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Location: India</p>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="
        text-center text-xs md:text-sm
        py-3 md:py-4
        border-t border-gray-700 text-gray-500
      ">
        © {new Date().getFullYear()} krushnakunj. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;