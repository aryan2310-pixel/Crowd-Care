import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Placeholder for future backend integration
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfefc]">
      <form
        className="w-full max-w-md bg-transparent rounded-xl px-4 py-10"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-[#183a24] mb-10 text-center">
          Welcome back
        </h1>
        <div className="mb-4">
          <label className="block text-[#213e27] font-semibold mb-2">
            Email or Username
          </label>
          <input
            type="text"
            name="emailOrUsername"
            placeholder="Enter your email or username"
            value={formData.emailOrUsername}
            onChange={handleChange}
            className="w-full border border-[#b8e7c7] rounded-md bg-[#fff] px-4 py-3 text-[#11c246] placeholder-[#7bb991] transition focus:outline-none focus:border-[#11c246]"
            required
          />
        </div>
        <div className="mb-2 mt-6">
          <label className="block text-[#213e27] font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-[#b8e7c7] rounded-md bg-[#fff] px-4 py-3 text-[#11c246] placeholder-[#7bb991] transition focus:outline-none focus:border-[#11c246]"
            required
          />
        </div>
        <div className="flex justify-start mb-6 mt-2">
          <a href="/forgot-password" className="text-[#209125] text-sm underline">
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-[#11c246] text-black font-semibold py-3 rounded-md transition hover:bg-[#07a43c] mt-3"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
