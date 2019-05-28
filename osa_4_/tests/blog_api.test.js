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

test("api should return 2 blogs in json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body.length).toBe(2);
});

test("blog should contain id in json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body[0].id && response.body[1].id).toBeDefined();
});

test("blog should contain id in json", async () => {
  const newBlog = {
    title: "Elixir",
    author: "Hän",
    url: "elixir-lang.org",
    likes: 10
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map(res => res.title);

  expect(response.body.length).toBe(initialBlogs.length + 1);

  expect(contents).toContain("Elixir");
});
