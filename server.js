const express = require("express");


const app = express();
const port = process.env.PORT || 8000;

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
  if (req.currentObject) {
    res.json(req.currentObject);
  } else {
    res.status(400).send("requested user not found");
  }
});

app.use(express.text());

app.post("/api/posts", (req, res) => {
  if (req.body && req.body.length) {
    let newPost = {
      id: posts.length + 1,
      post: req.body,
    };
    posts.push(newPost);
    res.send("posted successfully");
  } else {
    res.status(400).send("no post given");
  }
});

app.put("/api/posts/:id", (req, res) => {
  if (req.currentObject) {
    if (req.body && req.body.length) {
      req.currentObject.post = req.body;
      console.log(posts);
      return res.status(200).send("post edited successfully");
    } else {
      return res.status(400).send("no post given to edit");
    }
  }

  res.status(404).send("user not found");
});

app.delete("/api/posts/:id", (req, res) => {
  const indexToRemove = posts.findIndex(
    (post) => post.id === parseInt(req.params.id)
  );

  if (indexToRemove > -1) {
    posts.splice(indexToRemove, 1);
    return res.status(200).send("post removed successfully");
  }
  res.status(404).send("user was not found");
});

app.listen(port, () => {
  console.log(`server is running ot port ${port}`);
});
