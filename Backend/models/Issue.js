const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String },
  mediaUrls: [{ type: String }], // URLs or paths to uploaded media files
  status: { type: String, enum: ["Open", "In Progress", "Resolved"], default: "Open" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Issue", issueSchema);
