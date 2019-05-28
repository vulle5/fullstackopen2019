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

module.exports = blogRoutes;
