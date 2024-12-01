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

// DELETE
router.delete("/", (req, res) => {
  const { name } = req.params;
  console.log("delete");
  const index = comments.findIndex(
    (comment) => comment.name === parseInt(name)
  );

  if (index === -1) {
    res.status(404).json({ error: "comment not found" });
    return;
  }
  console.log(comments, "before splice");
  comments.splice(index, 1);
  console.log(comments);
  res.redirect("/");
});

// PATCH
/* router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { image, name, genre, year, score } = req.body;
  const index = comments.findIndex((comment) => comment.id === parseInt(id));

  if (index === -1) {
    res.status(404).json({ error: "movie not found" });
    return;
  }

  comments[index] = {
    id: parseInt(id),
    image,
    name,
    genre,
    year,
    score,
  };

  res.json(comments[index]);
}); */

module.exports = router;
