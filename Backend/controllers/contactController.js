const ContactMessage = require("../models/ContactMessage");

exports.submitContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, msg: "All fields required." });
    }
    const newMessage = new ContactMessage({ name, email, subject, message });
    await newMessage.save();
    res.json({ success: true, msg: "Message saved successfully." });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error." });
  }
};
