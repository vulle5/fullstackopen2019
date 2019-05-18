const listHelper = require("../utils/list_helper");

test("dummy should return one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("should count sum of blogs", () => {
    const blogs = [
      {
        title: "Java",
        author: "Minä",
        url: "google.com",
        likes: 5,
        id: "5cdffe8ca0e2862fac5c35b7"
      },
      {
        title: "JavaScript",
        author: "Minä",
        url: "google.com",
        likes: 5,
        id: "5ce00abea7efa24114584dfb"
      }
    ];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(10);
  });
});

describe("favorite blog", () => {
  test("should return object with highest likes", () => {
    const blogs = [
      {
        title: "Java",
        author: "Minä",
        url: "google.com",
        likes: 5,
        id: "5cdffe8ca0e2862fac5c35b7"
      },
      {
        title: "JavaScript",
        author: "Minä",
        url: "google.com",
        likes: 10,
        id: "5ce00abea7efa24114584dfb"
      }
    ];

    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(blogs[1]);
  });
});

describe("favorite writer", () => {
  test("should return writer with the most blogs", () => {
    const blogs = [
      {
        title: "Java",
        author: "Minä",
        url: "google.com",
        likes: 5,
        id: "5cdffe8ca0e2862fac5c35b7"
      },
      {
        title: "JavaScript",
        author: "Minä",
        url: "google.com",
        likes: 10,
        id: "5ce00abea7efa24114584dfb"
      },
      {
        title: "Elixir",
        author: "Joku muu",
        url: "google.com",
        likes: 7,
        id: "5ce00abea7efa24114584dfb"
      }
    ];

    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: "Minä", blogs: 2 });
  });
});
