
import React, { useState, useEffect } from "react";

const ReportIssues = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Other", // auto-set category
    location: "",
  });

  const [mediaFiles, setMediaFiles] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");



  // Use LocationIQ reverse geocoding with error logging
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://us1.locationiq.com/v1/reverse.php?key=pk.173a5764192bb4346b83776a611e403c&lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          if (data && data.display_name) {
            setFormData((prev) => ({ ...prev, location: data.display_name }));
          } else {
            setFormData((prev) => ({
              ...prev,
              location: `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`,
            }));
          }
        } catch (error) {
          console.error("Geocoding API error:", error);
          setFormData((prev) => ({
            ...prev,
            location: `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`,
          }));
        }
      });
    }
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
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
      const response = await fetch(`https://crowd-care-r1ub.onrender.com/api/issues`, {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (result.success) {
        setStatusMsg("Issue reported successfully!");
        setFormData({ title: "", description: "", category: "Other", location: "" });
        setMediaFiles(null);
        e.target.reset();
      } else {
        setStatusMsg("Failed to report issue: " + (result.msg || "Unknown error"));
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

        {/* Hidden Category */}
        <input type="hidden" name="category" value={formData.category} />

        {/* Location (read-only) */}
        <div className="mb-5">
          <label className="block text-[#213e27] font-semibold mb-1">Location (Auto-detected)</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            readOnly
            className="w-full border border-[#d9eede] rounded-md bg-[#f0f6f0] px-4 py-2 text-[#1a5425] placeholder-[#85bba0] cursor-not-allowed"
            placeholder="Detecting location..."
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#11c246] text-white font-semibold px-8 py-2 rounded-md transition hover:bg-[#069936] float-right"
        >
          Submit Report
        </button>

        {/* Status Message */}
        {statusMsg && (
          <p className="mt-4 text-[#209125] font-semibold clear-both">{statusMsg}</p>
        )}
      </form>
    </div>
  );
};

export default ReportIssues;
