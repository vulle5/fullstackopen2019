const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/User");

usersRouter.post("/", async (request, response) => {
  try {
    const body = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hashSync(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();

    response.json(savedUser);
  } catch (err) {
    console.log(err);
  }
});

module.exports = usersRouter;
