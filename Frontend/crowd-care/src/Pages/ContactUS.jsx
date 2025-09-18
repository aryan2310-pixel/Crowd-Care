import React from "react";

const ContactUS = () => {
  return (
    <div className="min-h-screen bg-[#f8fcf8] flex justify-center py-10 px-4">
      <form className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-2 text-[#142c1a]">Contact Us</h1>
        <p className="mb-8 text-[#43ac64] text-[17px]">
          We’re here to help! Reach out to us with any questions, feedback, or concerns. Our team is dedicated to providing timely and effective support to ensure a smooth experience with EcoReport.
        </p>
        
        {/* Name */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-[#1a3428]">Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full rounded-md border border-[#bbe6cb] bg-white px-4 py-3 mt-1 text-[#17a05a] placeholder-[#67bf8b] focus:outline-none focus:border-[#13b34d] transition"
          />
        </div>
        
        {/* Email */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-[#1a3428]">Your Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-md border border-[#bbe6cb] bg-white px-4 py-3 mt-1 text-[#17a05a] placeholder-[#67bf8b] focus:outline-none focus:border-[#13b34d] transition"
          />
        </div>
        
        {/* Subject */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-[#1a3428]">Subject</label>
          <input
            type="text"
            placeholder="Enter the subject"
            className="w-full rounded-md border border-[#bbe6cb] bg-white px-4 py-3 mt-1 text-[#17a05a] placeholder-[#67bf8b] focus:outline-none focus:border-[#13b34d] transition"
          />
        </div>

        {/* Message */}
        <div className="mb-8">
          <label className="block mb-1 font-semibold text-[#1a3428]">Your Message</label>
          <textarea
            placeholder="Enter your message"
            rows={5}
            className="w-full rounded-md border border-[#bbe6cb] bg-white px-4 py-3 mt-1 text-[#17a05a] placeholder-[#67bf8b] focus:outline-none focus:border-[#13b34d] transition resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#16ba4c] text-white font-semibold px-7 py-2 rounded-md hover:bg-[#099e39] transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUS;
