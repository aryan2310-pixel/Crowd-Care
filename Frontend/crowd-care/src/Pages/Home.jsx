import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const civicIssues = [
  { id: "#98765", description: "Pothole on Maple Avenue", status: "Resolved", statusClass: "bg-[#e7f3eb] text-[#278542]", dateReported: "2024-07-15", link: "/issues/98765" },
  { id: "#43210", description: "Broken Streetlight", status: "In Progress", statusClass: "bg-[#f5f5ee] text-[#abab2b]", dateReported: "2024-07-20", link: "/issues/43210" },
  { id: "#87654", description: "Illegal Dumping", status: "Open", statusClass: "bg-[#f2fbf5] text-[#278542]", dateReported: "2024-07-25", link: "/issues/87654" },
];

const Home = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token"); // JWT token stored after login
      if (!token) {
        // Redirect to login if no token
        navigate("/home");
        return;
      }

      try {
        const response = await fetch("/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserName(data.user.username);
      } catch (error) {
        console.error("Error fetching user name:", error);
        localStorage.removeItem("token"); // Clear invalid token
        navigate("/login");
      }
    }

    fetchUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#f8fcf8] py-10 px-4 md:px-0 flex justify-center">
      <div className="w-full max-w-3xl bg-[#fcfefc] rounded-xl shadow p-8">

        {/* Header */}
        <h1 className="text-3xl font-bold text-[#183a24] mb-1">
          Welcome, {userName || "Guest"}
        </h1>
        <p className="text-[#4cb673] mb-7 text-sm">
          Your personalized dashboard for a cleaner, greener community.
        </p>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-3">Quick Actions</h2>
          <div className="flex gap-4">
            <button className="bg-[#16ba4c] text-white font-semibold px-5 py-2 rounded-md shadow hover:bg-[#138e3c] transition">
              Report an Issue
            </button>
            <button className="bg-white border border-[#d7eeda] text-[#1a5425] font-semibold px-5 py-2 rounded-md shadow hover:bg-[#f2f8f4] transition">
              View My Issues
            </button>
          </div>
        </section>

        {/* Local Civic Issues Table */}
        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-3">Local Civic Issues</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left rounded-lg bg-white">
              <thead>
                <tr className="bg-[#f5fbf7]">
                  <th className="px-4 py-2 text-sm text-[#5c7866] font-medium">Issue ID</th>
                  <th className="px-4 py-2 text-sm text-[#5c7866] font-medium">Description</th>
                  <th className="px-4 py-2 text-sm text-[#5c7866] font-medium">Status</th>
                  <th className="px-4 py-2 text-sm text-[#5c7866] font-medium">Date Reported</th>
                </tr>
              </thead>
              <tbody>
                {civicIssues.map(({ id, description, status, statusClass, dateReported, link }) => (
                  <tr key={id} className="border-t border-[#e5f2ea]">
                    <td className="px-4 py-2 text-base text-[#3e5e47]">{id}</td>
                    <td className="px-4 py-2">
                      <Link to={link} className="text-[#40ba73] hover:underline">
                        {description}
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-xl ${statusClass}`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-[#45b464] font-medium">{dateReported}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Get Involved Section */}
        <section>
          <h2 className="font-semibold text-lg mb-2">Get Involved</h2>
          <p className="mb-4 text-[#183a24] text-[15px]">
            Join community initiatives and contribute to a sustainable environment. Explore ongoing projects and events in your area.
          </p>
          <button className="px-5 py-2 rounded-md bg-[#f3faf4] text-[#1a5425] font-semibold shadow border border-[#dbeee0] hover:bg-[#e5f4ea] transition">
            Explore Initiatives
          </button>
        </section>

      </div>
    </div>
  );
};

export default Home;
