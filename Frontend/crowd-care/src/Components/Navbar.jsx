import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Report Issue", path: "/report" },
    { name: "Analytics", path: "/analytics" },
    { name: "Contact Us", path: "/ContactUS" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Adjust as per your auth token key
    navigate("/login");
  };

  return (
    <header
      className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#d4e6da] px-10 py-3 shadow-md relative z-50"
      style={{ backgroundColor: "#e7f3eb" }}
    >
      {/* Logo + Title */}
      <div className="flex items-center gap-4 text-[#0e1b12]">
        <div className="size-6">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <NavLink
          to="/"
          className="text-[#0e1b12] text-2xl font-extrabold leading-tight tracking-[-0.02em] transition-transform duration-300 hover:scale-110 hover:drop-shadow-lg"
        >
          Crowd-Care
        </NavLink>
      </div>

      {/* Navigation + Actions */}
      <div className="flex flex-1 justify-end gap-6 items-center">
        {/* Nav Links */}
        <nav className="flex items-center gap-9">
          {navItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `text-[#0e1612] text-sm font-medium relative group transition-colors duration-300 hover:text-rose-600 ${
                  isActive ? "font-bold underline" : ""
                }`
              }
            >
              {name}
              <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          ))}
        </nav>

        {/* Search */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => setShowSearch(true)}
          onMouseLeave={() => setShowSearch(false)}
        >
          <div
            className={`flex items-center rounded-xl border border-[#ddd] bg-[#f9f9f9] overflow-hidden transition-all duration-300 ease-in-out ${
              showSearch ? "w-56 px-2" : "w-10"
            }`}
          >
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="flex items-center justify-center text-[#0e1b12] size-10 transition-all duration-300 hover:text-rose-500"
              aria-label="Toggle search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"></path>
              </svg>
            </button>

            {showSearch && (
              <input
                type="text"
                autoFocus
                placeholder="Enter your text here..."
                className="flex-1 ml-2 bg-transparent border-none outline-none text-sm text-[#0e1b12] placeholder-gray-500"
              />
            )}
          </div>
        </div>

        {/* Notification Button */}
        <button
          className="flex items-center justify-center rounded-xl h-10 w-10 bg-[#f5fdf7] border border-[#d8eedd] text-[#0e1b12] transition-all duration-300 hover:bg-[#e1f3e6] hover:border-green-500 hover:shadow-md hover:shadow-green-200"
          aria-label="Notifications"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
          </svg>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-xl border-2 border-rose-500 bg-white text-rose-500 font-bold text-sm transition-all duration-300 ease-in-out hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-300"
        >
          Logout
        </button>

        {/* Profile Image Button */}
        <button
          onClick={() => navigate("/profile")}
          aria-label="Profile"
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-transparent hover:border-rose-400 hover:scale-105 transition-all duration-300 cursor-pointer"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDTsSh2u7zyRAr9wvBLVZ0uDgQNgpqPvDRTMLp00QBs7bwurh6L3xOKC0btgofX_VdovjdQ1OKVlfG4RAteDEDaFLzfKD9am8ii5Aw_TrXcr_tNMvUhDm2EwWu5GAmeZH81BlbcUvNf4Oxr4JagcP0Teag3MjZzvQ3rzFLvuK-zrO66_AbGuhw44Q1XsWAgie-85GNRCIUrpunToLrjtAdf6PPK7bo73MZYnZLxOsVx53FQ2pGeR3Hmc8v3OS_rUpc_fsqLmOoqfOzh")',
          }}
        />
      </div>
    </header>
  );
};

export default Navbar;
