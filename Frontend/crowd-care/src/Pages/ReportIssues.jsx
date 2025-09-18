import React, { useState } from "react";

const ReportIssues = () => {
  const [, setMedia] = useState(null);

  return (
    <div className="min-h-screen bg-[#f8fcf8] py-10 px-4 md:px-0 flex justify-center">
      <form className="w-full max-w-2xl bg-[#fcfefc] rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold text-[#183a24] mb-8">Report a New Issue</h1>
        
        {/* Issue Title */}
        <div className="mb-5">
          <label className="block text-[#213e27] font-semibold mb-1">Issue Title</label>
          <input
            type="text"
            placeholder="e.g., Pothole on Elm Street"
            className="w-full border border-[#d9eede] rounded-md bg-[#f8fcf8] px-4 py-2 focus:outline-none focus:border-[#47c375] text-[#1a5425] placeholder-[#85bba0] transition"
          />
        </div>
        
        {/* Description */}
        <div className="mb-5">
          <label className="block text-[#213e27] font-semibold mb-1">Description</label>
          <textarea
            rows={4}
            placeholder="Provide a detailed description of the issue"
            className="w-full border border-[#d9eede] rounded-md bg-[#f8fcf8] px-4 py-2 focus:outline-none focus:border-[#47c375] text-[#1a5425] placeholder-[#85bba0] transition resize-none"
          />
        </div>
        
        {/* Category */}
        <div className="mb-5">
          <label className="block text-[#213e27] font-semibold mb-1">Category</label>
          <select
            className="w-full border border-[#d9eede] rounded-md bg-[#f8fcf8] px-4 py-2 text-[#1a5425] focus:outline-none focus:border-[#47c375] appearance-none transition"
            defaultValue=""
          >
            <option value="" disabled>Select a category</option>
            <option>Pothole</option>
            <option>Streetlight</option>
            <option>Garbage</option>
            <option>Waterlogging</option>
            <option>Other</option>
          </select>
        </div>
        
        {/* Map */}
        <div className="mb-5">
          <img
            src="https://maps.gstatic.com/tactile/basepage/pegman_sherlock.png" // Replace with your map embed or API
            alt="Map preview" 
            className="w-full h-80 object-cover rounded-md"
            style={{ background: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Map_of_San_Francisco.png') center/cover no-repeat" }}
          />
        </div>
        
        {/* Location */}
        <div className="mb-5">
          <label className="block text-[#213e27] font-semibold mb-1">Location</label>
          <input
            type="text"
            placeholder="Enter address or use map"
            className="w-full border border-[#d9eede] rounded-md bg-[#f8fcf8] px-4 py-2 focus:outline-none focus:border-[#47c375] text-[#1a5425] placeholder-[#85bba0] transition"
          />
        </div>
        
        {/* Upload Media */}
        <div className="mb-8">
          <label className="block text-[#213e27] font-semibold mb-1">Upload Media</label>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            className="w-full border border-[#d9eede] rounded-md bg-[#f8fcf8] px-4 py-2 focus:outline-none focus:border-[#47c375] text-[#1a5425] file:mr-3 file:bg-[#e6f8eb] file:border-0 file:rounded-md file:px-4 file:py-2 transition cursor-pointer"
            onChange={(e) => setMedia(e.target.files)}
          />
        </div>
        
        <button
          type="submit"
          className="bg-[#11c246] text-white font-semibold px-8 py-2 rounded-md transition hover:bg-[#069936] float-right"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportIssues;
