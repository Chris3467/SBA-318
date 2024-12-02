const express = require("express");
const router = express.Router();
const { dummyPost } = require("../data/posts");

// GET
router.get("/", (req, res) => {
  res.json({ dummyPost });
});
module.exports = router;
