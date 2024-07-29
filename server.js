const express = require("express");
const path = require("path");

const app = express();

let posts = [
  { id: 1, post: "post 1 " },
  { id: 2, post: "post 2 " },
  { id: 3, post: "post 3 " },
];

app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.param("id", (req, res, next, id) => {
  const foundPost = posts.find((post) => post.id === parseInt(id));
    req.currentObject = foundPost;
  next();
});

app.get("/api/posts/:id", (req, res) => {
    console.log(req.params)
  if (req.currentObject) {
    res.json(req.currentObject);
  } else {
    res.status(400).send("requested user not found");
  }
});

app.listen(8000, () => {
  console.log("server is running");
});
