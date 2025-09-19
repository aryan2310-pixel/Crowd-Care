const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth"); // Auth routes (signup, login)
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON body

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error: " + err));

// Static folder for uploads
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", require("./routes/contact"));
app.use("/api/issues", require("./routes/issue"));

// Default route
app.get("/", (req, res) => {
  res.send("Crowd-Care backend is running");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// 404 Not Found handler
app.use((req, res) => {
  res.status(404).json({ success: false, msg: "Route not found" });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, msg: "Server error" });
});

console.log('JWT_SECRET:', process.env.c47c8f1a76e45f3fd8dabc92107f3b2af2d849e9daf33e9222a09742ea3153c9);
