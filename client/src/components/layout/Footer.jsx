import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500">krushnakunj</h2>
          <p className="mt-3 text-gray-400">
            Delicious food delivered to your doorstep. Fresh, fast, and tasty!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-gray-400">Email: support@krushnakunj.com</p>
          <p className="text-gray-400">Phone: +91 98765 43210</p>
          <p className="text-gray-400">Location: India</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center py-4 border-t border-gray-700 text-gray-500">
        © {new Date().getFullYear()} krushnakunj. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;