import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
     <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-xl border-2 border-rose-500 bg-white text-rose-500 font-bold text-sm transition-all duration-300 ease-in-out hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-300"
        >
          Logout
        </button>
  );
};

export default LogoutButton;
