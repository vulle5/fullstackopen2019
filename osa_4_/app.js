require("dotenv").config();
const keys = require("./utils/config/keys");
const express = require("express");
const app = express();
const blogRoutes = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(bodyParser.json());
app.use("/api/blogs", blogRoutes);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

module.exports = app;
