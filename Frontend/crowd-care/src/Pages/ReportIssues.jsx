import React, { useState } from "react";

const ReportIssues = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const [mediaFiles, setMediaFiles] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title || !formData.description || !formData.category) {
      setStatusMsg("Please fill all required fields.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("location", formData.location);

    if (mediaFiles) {
      for (let i = 0; i < mediaFiles.length; i++) {
        data.append("mediaFiles", mediaFiles[i]);
      }
    }

    try {
      const response = await fetch("http://localhost:4000/api/issues", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (result.success) {
        setStatusMsg("Issue reported successfully!");
        setFormData({ title: "", description: "", category: "", location: "" });
        setMediaFiles(null);
        e.target.reset();
      } else {
        setStatusMsg("Failed to report issue: " + result.msg);
      }
    } catch (error) {
      setStatusMsg("Error submitting issue: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fcf8] py-10 px-4 md:px-0 flex justify-center">
      <form
        className="w-full max-w-2xl bg-[#fcfefc] rounded-xl shadow p-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-[#183a24] mb-8">Report a New Issue</h1>

        {/* Issue Title */}
        <div className="mb-5">
          <label className="block text-[#213e27] font-semibold mb-1">Issue Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Pothole on Elm Street"
            className="w-full border border-[#d9eede] rounded-md bg-[#f8fcf8] px-4 py-2 focus:outline-none focus:border-[#47c375] text-[#1a5425] placeholder-[#85bba0] transition"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-[#213e27] font-semibold mb-1">Description</label>
          <textarea
            rows={4}
            name="description"
            placeholder="Provide a detailed description of the issue"
            className="w-full border border-[#d9eede] rounded-md bg-[#f8fcf8] px-4 py-2 focus:outline-none focus:border-[#47c375] text-[#1a5425] placeholder-[#85bba0] transition resize-none"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div className="mb-5">
          <label className="block text-[#213e27] font-semibold mb-1">Category</label>
          <select
            name="category"
            className="w-full border border-[#d9eede] rounded-md bg-[#f8fcf8] px-4 py-2 text-[#1a5425] focus:outline-none focus:border-[#47c375] appearance-none transition"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
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
            src="https://maps.gstatic.com/tactile/basepage/pegman_sherlock.png"
            alt="Map preview"
            className="w-full h-80 object-cover rounded-md"
            style={{
              background:
                "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Map_of_San_Francisco.png') center/cover no-repeat",
            }}
          />
        </div>

        {/* Location */}
        <div className="mb-5">
          <label className="block text-[#213e27] font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter address or use map"
            className="w-full border border-[#d9eede] rounded-md bg-[#f8fcf8] px-4 py-2 focus:outline-none focus:border-[#47c375] text-[#1a5425] placeholder-[#85bba0] transition"
            value={formData.location}
            onChange={handleChange}
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
            onChange={(e) => setMediaFiles(e.target.files)}
          />
        </div>

        <button
          type="submit"
          className="bg-[#11c246] text-white font-semibold px-8 py-2 rounded-md transition hover:bg-[#069936] float-right"
        >
          Submit Report
        </button>

        {statusMsg && (
          <p className="mt-4 text-[#209125] font-semibold clear-both">{statusMsg}</p>
        )}
      </form>
    </div>
  );
};

export default ReportIssues;
