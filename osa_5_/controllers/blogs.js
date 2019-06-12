const blogRoutes = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");
const User = require("../models/User");

blogRoutes.get("/", (request, response) => {
  Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .then(blogs => {
      response.json(blogs);
    });
});

blogRoutes.post("/", async (request, response) => {
  const body = request.body;

  const token = request.token;

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id,
      likes: body.likes
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog.toJSON());
  } catch (error) {
    response.status(400).json(error);
  }
});

blogRoutes.delete("/:id", async (request, response) => {
  const token = request.token;

  try {
    const blog = await Blog.findById(request.params.id);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (
      !token ||
      !decodedToken.id ||
      blog.user.toString() !== decodedToken.id.toString()
    ) {
      return response
        .status(401)
        .json({ error: "Unauthorized user or no token" });
    }

    const result = await Blog.findByIdAndRemove(request.params.id);
    if (result) {
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response.status(400).json(error);
  }
});

blogRoutes.put("/:id", (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON());
    })
    .catch(error => console.log(error));
});

module.exports = blogRoutes;
