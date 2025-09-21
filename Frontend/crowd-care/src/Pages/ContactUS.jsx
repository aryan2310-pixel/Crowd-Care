/* global process */
import React, { useState } from "react";

const ContactUS = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [statusMsg, setStatusMsg] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setStatusMsg("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatusMsg("Failed to send message: " + (data.msg || "Unknown error"));
      }
    } catch (error) {
      setStatusMsg("An error occurred: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fcf8] flex justify-center py-10 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-2 text-[#142c1a]">Contact Us</h1>
        <p className="mb-8 text-[#43ac64] text-[17px]">
          We’re here to help! Reach out to us with any questions, feedback, or concerns. Our team is dedicated to providing timely and effective support to ensure a smooth experience with EcoReport.
        </p>

        {/* Name */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-[#1a3428]">Your Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full rounded-md border border-[#bbe6cb] bg-white px-4 py-3 mt-1 text-[#17a05a] placeholder-[#67bf8b] focus:outline-none focus:border-[#13b34d] transition"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-[#1a3428]">Your Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full rounded-md border border-[#bbe6cb] bg-white px-4 py-3 mt-1 text-[#17a05a] placeholder-[#67bf8b] focus:outline-none focus:border-[#13b34d] transition"
            required
          />
        </div>

        {/* Subject */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-[#1a3428]">Subject</label>
          <input
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter the subject"
            className="w-full rounded-md border border-[#bbe6cb] bg-white px-4 py-3 mt-1 text-[#17a05a] placeholder-[#67bf8b] focus:outline-none focus:border-[#13b34d] transition"
            required
          />
        </div>

        {/* Message */}
        <div className="mb-8">
          <label className="block mb-1 font-semibold text-[#1a3428]">Your Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows={5}
            className="w-full rounded-md border border-[#bbe6cb] bg-white px-4 py-3 mt-1 text-[#17a05a] placeholder-[#67bf8b] focus:outline-none focus:border-[#13b34d] transition resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#16ba4c] text-white font-semibold px-7 py-2 rounded-md hover:bg-[#099e39] transition"
        >
          Submit
        </button>

        {statusMsg && (
          <p className="mt-4 text-center text-green-600 font-semibold">
            {statusMsg}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactUS;
