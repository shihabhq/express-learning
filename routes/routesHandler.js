import express from "express";

const crudRouter = express.Router();

//database
let posts = [
  { id: 1, post: "this is first post in the db " },
  { id: 2, post: "post 2 in db" },
  { id: 3, post: "post 3 in db" },
];

//cRud GET posts to read
crudRouter.get("/", (req, res) => {
  res.json(posts);
});

//id parameter middleware
crudRouter.param("id", (req, res, next, id) => {
  const foundPost = posts.find((post) => post.id === parseInt(id));
  req.currentObject = foundPost;
  next();
});

//getting specific post from request
crudRouter.get("/:id", (req, res, next) => {
  if (req.currentObject) {
    return res.json(req.currentObject);
  }
  next({ code: 404, msg: "post was not found" });
});

//will get the post as text value from the user
crudRouter.use(express.text());

//Crud posting a post to create
crudRouter.post("/", (req, res, next) => {
  if (req.body && req.body.length) {
    let newPost = {
      id: posts.length + 1,
      post: req.body,
    };
    posts.push(newPost);
    return res.send({ msg: "posted successfully" });
  }
  next({ code: 400, msg: "no post was given" }); //passing to error handler 
});

//crUd putting new value as a post to update
crudRouter.put("/:id", (req, res, next) => {
  if (req.currentObject) {
    if (req.body && req.body.length) {
      req.currentObject.post = req.body;
      return res.status(200).send("post edited successfully");
    } else {
      return next({ code: 400, msg: "no post given" });
    }
  }

  next({ code: 404, msg: "post was not found to update" });
});

//cruD delete a post
crudRouter.delete("/:id", (req, res, next) => {
  const indexToRemove = posts.findIndex(
    (post) => post.id === parseInt(req.params.id)
  );

  if (indexToRemove > -1) {
    posts.splice(indexToRemove, 1);
    return res.status(200).send("post removed successfully");
  }
  next({ code: 404, msg: "post was not found" });
});

export default crudRouter;
