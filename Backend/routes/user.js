// routes/user.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, (req, res) => {
  // req.user is set by authMiddleware
  res.json({ success: true, user: req.user });
});

module.exports = router;
