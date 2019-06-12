const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/User");

const api = supertest(app);

const initialUsers = [
  {
    username: "Vulle",
    name: "Severi",
    password: "salainen"
  },
  {
    username: "Pulle",
    name: "Severi",
    password: "salainen"
  }
];

beforeEach(async () => {
  await User.deleteMany({});

  let userObject = new User(initialUsers[0]);
  await userObject.save();

  userObject = new User(initialUsers[1]);
  await userObject.save();
});

describe("user api", () => {
  test("should not allow passwords and usernames that are under 3 letters", async () => {
    const newUserWithWrongParams = {
      username: "12",
      name: "Severi",
      password: "sa3"
    };

    const newUserWithRightParams = {
      username: "Vulle",
      name: "Severi",
      password: "salainen"
    };

    await api
      .post("/api/users")
      .send(newUserWithWrongParams)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    await api
      .post("/api/users")
      .send(newUserWithRightParams)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/users");

    expect(response.body.length).toBe(initialUsers.length + 1);
  });
});
