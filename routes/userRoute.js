const express = require("express");
const router = express.Router();
const { dummyUser } = require("../data/users");

// GET
router.get("/", (req, res) => {
  res.json({ dummyUser });
});

module.exports = router;
