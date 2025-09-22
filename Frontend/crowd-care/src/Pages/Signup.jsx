
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [statusMsg, setStatusMsg] = useState("");
  const navigate = useNavigate();

  // const apiUrl = process.env.REACT_APP_API_URL ;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setStatusMsg("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setStatusMsg("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`https://crowd-care-r1ub.onrender.com/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setStatusMsg("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setStatusMsg(data.msg || "Signup failed");
      }
    } catch (error) {
      setStatusMsg("Signup error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfefc] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-transparent rounded-xl px-4 py-10"
      >
        <h1 className="text-2xl font-bold text-[#183a24] mb-10 text-center">
          Create your account
        </h1>

        <div className="mb-4">
          <label className="block text-[#213e27] font-semibold mb-2">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="w-full border border-[#b8e7c7] rounded-md bg-[#fff] px-4 py-3 text-[#11c246] placeholder-[#7bb991] transition focus:outline-none focus:border-[#11c246]"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#213e27] font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full border border-[#b8e7c7] rounded-md bg-[#fff] px-4 py-3 text-[#11c246] placeholder-[#7bb991] transition focus:outline-none focus:border-[#11c246]"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#213e27] font-semibold mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full border border-[#b8e7c7] rounded-md bg-[#fff] px-4 py-3 text-[#11c246] placeholder-[#7bb991] transition focus:outline-none focus:border-[#11c246]"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <div className="mb-8">
          <label className="block text-[#213e27] font-semibold mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="w-full border border-[#b8e7c7] rounded-md bg-[#fff] px-4 py-3 text-[#11c246] placeholder-[#7bb991] transition focus:outline-none focus:border-[#11c246]"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#11c246] text-black font-semibold py-3 rounded-md transition hover:bg-[#07a43c]"
        >
          Sign Up
        </button>

        {statusMsg && (
          <p className="mt-4 text-[#209125] font-semibold text-center">{statusMsg}</p>
        )}
      </form>
    </div>
  );
};

export default Signup;
