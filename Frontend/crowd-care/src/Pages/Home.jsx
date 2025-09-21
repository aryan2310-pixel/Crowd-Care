/* global process */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [issues, setIssues] = useState([]); // reported issues from backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token"); // JWT token stored after login
      if (!token) {
        navigate("/login");
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

  useEffect(() => {
    async function fetchIssues() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/issues`);
        if (!response.ok) {
          throw new Error("Failed to fetch issues");
        }
        const data = await response.json();
        setIssues(data.issues || []);
      } catch (err) {
        console.error("Error fetching issues:", err);
        setError("Failed to load reported issues.");
      } finally {
        setLoading(false);
      }
    }
    fetchIssues();
  }, []);

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
            <Link
              to="/report"
              className="bg-[#16ba4c] text-white font-semibold px-5 py-2 rounded-md shadow hover:bg-[#138e3c] transition flex items-center justify-center"
            >
              Report an Issue
            </Link>

            <button className="bg-white border border-[#d7eeda] text-[#1a5425] font-semibold px-5 py-2 rounded-md shadow hover:bg-[#f2f8f4] transition">
              View My Issues
            </button>
          </div>
        </section>

        {/* Reported Issues Cards */}
        <section>
          <h2 className="font-semibold text-lg mb-3">Reported Issues</h2>

          {loading && <p className="text-[#183a24] font-medium">Loading issues...</p>}
          {error && <p className="text-red-600 font-semibold">{error}</p>}

          {!loading && !error && issues.length === 0 && (
            <p className="text-[#496a48]">No issues reported yet.</p>
          )}

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {issues.map(
              ({
                _id,
                title,
                description,
                category,
                location,
                status,
                dateReported,
                mediaUrls,
              }) => (
                <div
                  key={_id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-5 flex flex-col"
                >
                  <h3
                    className="text-[#1a5425] font-semibold text-lg mb-1 truncate"
                    title={title}
                  >
                    {title}
                  </h3>

                  {/* Media gallery */}
                  {mediaUrls && mediaUrls.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2 overflow-x-auto">
                      {mediaUrls.map((url, idx) =>
                        url.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                          <img
                            key={idx}
                            src={
                              url.startsWith("http")
                                ? url
                                : `${process.env.REACT_APP_API_URL}/${url.replace(/\\/g, "/")}`
                            }
                            alt={`issue-media-${idx}`}
                            className="h-20 w-auto rounded-md object-cover"
                          />
                        ) : url.match(/\.(mp4|webm|ogg)$/i) ? (
                          <video
                            key={idx}
                            className="h-20 rounded-md"
                            controls
                            src={`${process.env.REACT_APP_API_URL}/${url.replace(/\\/g, "/")}`}
                          />
                        ) : null
                      )}
                    </div>
                  )}

                  <p
                    className="text-[#3e5e47] mb-3 whitespace-pre-wrap break-words"
                    style={{ maxHeight: 144, overflow: "auto" }}
                    title={description}
                  >
                    {description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs font-semibold px-2 py-1 bg-[#d1e8d3] text-[#278542] rounded-full">
                      {category || "Other"}
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 bg-[#e6f3e9] text-[#3a663a] rounded-full">
                      {status || "Open"}
                    </span>
                  </div>

                  <p className="text-[#4a7a3c] text-sm mb-2 truncate" title={location}>
                    Location: {location || "Not specified"}
                  </p>

                  <p className="text-[#3e5e47] text-xs font-medium mt-auto">
                    Reported on:{" "}
                    {new Date(dateReported).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* Get Involved Section */}
        <section className="mt-8">
          <h2 className="font-semibold text-lg mb-2">Get Involved</h2>
          <p className="mb-4 text-[#183a24] text-[15px]">
            Join community initiatives and contribute to a sustainable environment. Explore ongoing projects and events in your
            area.
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
