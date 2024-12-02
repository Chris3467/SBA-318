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
  const name = req.body.name;
  // console.log("delete");
  // console.log(comments);
  // console.log(name);
  const index = comments.findIndex((comment) => comment.name === name);

  if (index === -1) {
    res.status(404).json({ error: "comment not found" });
    return;
  }
  //console.log(comments, "before splice");
  comments.splice(index, 1);
  //console.log(comments);
  res.redirect("/indexRoute");
});

// Code below does not work
/* router.delete("/", (req, res) => {
  
  const { name } = req.params.name;

  const index = comments.findIndex((comment) => comment.name === name);

  if (index === -1) {
    res.status(404).json({ error: "comment not found" });
    return;
  }
  console.log(comments, "before slice");
  comments.splice(index, 1);
  res.redirect("/");
}); */

// PATCH
router.patch("/", (req, res) => {
  const { name, genre, year, score } = req.body;
  const index = comments.findIndex((comment) => comment.name === name);

  if (index === -1) {
    res.status(404).json({ error: "comment not found" });
    return;
  }

  comments[index].genre = genre;
  comments[index].year = year;
  comments[index].score = score;

  res.redirect("/indexRoute");
});

// Query Parameters
router.get("/search", (req, res) => {
  const { genre } = req.query;

  const filteredComments = comments.filter(
    (comment) => comment.genre === genre
  );

  res.render("indexRoute", {
    title: "Search Results",
    comments: filteredComments,
  });
});

module.exports = router;
