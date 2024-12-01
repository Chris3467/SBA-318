const express = require("express");
const router = express.Router();
const comments = require("../data/comments");

// GET
router.get("/", (req, res) => {
  res.render("indexRoute", { title: "Home", comments });
});

// POST
router.post("/", (req, res) => {
  const { image, name, genre, year, score } = req.body;
  const newComment = {
    id: comments.length + 1,
    image,
    name,
    genre,
    year,
    score,
  };
  comments.push(newComment);
  res.redirect("/indexRoute");
  console.log(newComment);
});

module.exports = router;
