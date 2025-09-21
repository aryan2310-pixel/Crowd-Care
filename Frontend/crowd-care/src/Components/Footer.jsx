// EcoFooter.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#e7f3eb] text-[#0e1b12] mt-8 border-t border-solid border-t-[#e7f3eb]">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:justify-between gap-8">
        {/* Brand and About */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-lg font-bold">CrowdCare</span>
          </div>
          <p className="text-sm text-[#32443b]">
            Your trusted source for environmental insights and reporting. Join us in building a greener future.
          </p>
          <div className="flex gap-3 mt-2">
            <a href="#" aria-label="Twitter" className="rounded-full bg-[#b0dbb5] hover:bg-[#0e1b12] p-2 text-[#0e1b12] hover:text-[#e7f3eb] transition">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Facebook" className="rounded-full bg-[#b0dbb5] hover:bg-[#0e1b12] p-2 text-[#0e1b12] hover:text-[#e7f3eb] transition">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="#" aria-label="YouTube" className="rounded-full bg-[#b0dbb5] hover:bg-[#0e1b12] p-2 text-[#0e1b12] hover:text-[#e7f3eb] transition">
              <FaYoutube className="w-5 h-5" />
            </a>
          </div>
        </div>
        {/* Site Links */}
        <div className="flex-1 flex flex-col gap-2">
          <span className="font-semibold mb-1">Quick Links</span>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "hover:underline" +
              (isActive ? " font-semibold text-green-700" : "")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/report"
            className={({ isActive }) =>
              "hover:underline" +
              (isActive ? " font-semibold text-green-700" : "")
            }
          >
            Report Issue
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              "hover:underline" +
              (isActive ? " font-semibold text-green-700" : "")
            }
          >
            About
          </NavLink>
          <NavLink
            to="/ContactUS"
            className={({ isActive }) =>
              "hover:underline" +
              (isActive ? " font-semibold text-green-700" : "")
            }
          >
            Contact Us
          </NavLink>
        </div>
        {/* Contact Info */}
        <div className="flex-1 flex flex-col gap-2">
          <span className="font-semibold mb-1">Contact Us</span>
          <span className="text-sm">support@crowdcare.com</span>
          <span className="text-sm">123 Green Lane, India</span>
          <span className="text-sm">Environment Helpline: +91-12345-67890</span>
        </div>
      </div>
      <div className="text-center text-xs py-4 text-[#607d5f] border-t border-[#b0dbb5]">
        © {new Date().getFullYear()} CrowdCare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
