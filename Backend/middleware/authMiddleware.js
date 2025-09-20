const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path if needed

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ✅ Check if token exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch user from DB (exclude password)
    const user = await User.findById(decoded.userId || decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // ✅ Attach user object to req
    req.user = user;

    next(); // Continue to next middleware/route
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ success: false, msg: "Invalid token" });
  }
};

module.exports = authMiddleware;
