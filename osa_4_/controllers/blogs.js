const blogRoutes = require("express").Router();
const Blog = require("../models/Blog");

blogRoutes.get("/", (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs);
  });
});

blogRoutes.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    })
    .catch(error => {
      response.status(400).json(error);
    });
});

blogRoutes.delete("/:id", async (request, response) => {
  const result = await Blog.findByIdAndRemove(request.params.id);
  try {
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
