import React, { useState } from "react";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    emailNotify: false,
    pushNotify: false,
    weeklyDigest: false,
  });

  const [reportedIssues] = useState([
    { id: "#12345", description: "Pothole on Main Street", status: "Resolved", date: "2024-07-15" },
    { id: "#67890", description: "Broken Streetlight", status: "In Progress", date: "2024-07-20" },
    { id: "#11223", description: "Illegal Dumping", status: "Open", date: "2024-07-25" },
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    alert("Changes Saved!");
  };

  return (
    <div className="flex min-h-screen bg-[#f3f9f4]">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full shadow-sm"
          />
          <span className="font-medium text-[#0e1612]">Sophia Clark</span>
        </div>

        <nav className="flex flex-col gap-3 mt-4">
          {[
            { label: "Home", icon: "🏠" },
            { label: "Explore", icon: "🔍" },
            { label: "My Issues", icon: "📄" },
            { label: "Notifications", icon: "🔔" },
            { label: "Profile", icon: "👤" },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-green-100 hover:shadow-sm ${
                item.label === "Profile" ? "bg-green-100 font-semibold" : ""
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-1 text-[#0e1612]">Profile Settings</h1>
        <p className="text-green-600 mb-6">Manage your account settings and preferences.</p>

        {/* Personal Info */}
        <section className="mb-8">
          <h2 className="font-semibold mb-3 text-[#0e1612]">Personal Information</h2>
          <div className="flex flex-col gap-4 max-w-md">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
            />
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="mb-8">
          <h2 className="font-semibold mb-3 text-[#0e1612]">Notification Preferences</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="emailNotify"
                checked={formData.emailNotify}
                onChange={handleChange}
                className="w-4 h-4 accent-green-500"
              />
              Receive email notifications about issue updates
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="pushNotify"
                checked={formData.pushNotify}
                onChange={handleChange}
                className="w-4 h-4 accent-green-500"
              />
              Receive push notifications for new issues in your area
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="weeklyDigest"
                checked={formData.weeklyDigest}
                onChange={handleChange}
                className="w-4 h-4 accent-green-500"
              />
              Receive weekly digest of top issues
            </label>
          </div>
        </section>

        {/* Reported Issues History */}
        <section className="mb-8">
          <h2 className="font-semibold mb-3 text-[#0e1612]">Reported Issues History</h2>
          <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-[#f3f9f4]">
              <tr>
                <th className="px-4 py-2">Issue ID</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date Reported</th>
              </tr>
            </thead>
            <tbody>
              {reportedIssues.map((issue) => (
                <tr
                  key={issue.id}
                  className="border-t border-gray-200 hover:bg-green-50 transition-colors"
                >
                  <td className="px-4 py-2">{issue.id}</td>
                  <td className="px-4 py-2 text-green-600">{issue.description}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        issue.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : issue.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-green-600">{issue.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Save Changes Button */}
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-md"
        >
          Save Changes
        </button>
      </main>
    </div>
  );
};

export default ProfileSettings;