const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/Blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Java",
    author: "Minä",
    url: "google.com",
    likes: 5
  },
  {
    title: "Flutter",
    author: "Sinä",
    url: "flutter.io",
    likes: 5
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("api should return 2 blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(2);
});
