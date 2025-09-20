const express = require("express");
const router = express.Router();
const multer = require("multer");
const { submitIssueWithMedia } = require("../controllers/issueController");
const Issue = require("../models/Issue"); // Adjust path accordingly

// Setup multer storage and file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");  // Make sure this folder exists in backend root
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// File filter to accept only images/videos
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Route: GET /api/issues - fetch all issues
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find().sort({ dateReported: -1 }); // latest first
    res.json({ issues });
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).json({ success: false, msg: "Failed to fetch issues" });
  }
});

// Route: POST /api/issues - submit new issue with media files
router.post("/", upload.array("mediaFiles", 5), submitIssueWithMedia);

module.exports = router;
