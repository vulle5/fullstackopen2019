const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/User");

usersRouter.get("/", async (request, response) => {
  User.find({}).then(user => {
    response.json(user);
  });
});

usersRouter.post("/", async (request, response) => {
  try {
    const body = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hashSync(body.password, saltRounds);

    if (body.username.length >= 3 && body.password.length >= 3) {
      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
      });
      const savedUser = await user.save();

      response.json(savedUser);
    } else {
      response.status(400).json({
        error: "username and password must be 3 letters or more"
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = usersRouter;
