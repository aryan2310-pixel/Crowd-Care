const Issue = require("../models/Issue");

exports.submitIssueWithMedia = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    if (!title || !description || !category) {
      return res
        .status(400)
        .json({ success: false, msg: "Title, description, and category required." });
    }

    // Extract file paths from uploaded files
    const mediaUrls = req.files ? req.files.map((file) => file.path) : [];

    const newIssue = new Issue({
      title,
      description,
      category,
      location,
      mediaUrls,
    });

    await newIssue.save();

    res.json({ success: true, msg: "Issue with media uploaded successfully." });
  } catch (error) {
    console.error("Error submitting issue with media:", error);
    res.status(500).json({ success: false, msg: "Server error." });
  }
};
