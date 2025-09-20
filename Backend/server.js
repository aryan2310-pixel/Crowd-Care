const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error: " + err));

// Static folder
app.use("/uploads", express.static("uploads"));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", require("./routes/contact"));
app.use("/api/issues", require("./routes/issue"));
app.use("/api/user", require("./routes/user"));


// Default route
app.get("/", (req, res) => {
  res.send("Crowd-Care backend is running");
});

// // Test user route ✅ (place before 404)
// app.get("/api/user", (req, res) => {
//   res.json({ name: "Aryan" });
// });


// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, msg: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, msg: "Server error" });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log("JWT_SECRET:", process.env.JWT_SECRET);
