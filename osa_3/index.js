const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
// This require MUST be before any file that requires it
require("./models/Person");
const errorHandler = require("./middleware/errorHandle");
const unknownEndpoint = require("./middleware/unknownEndpoint");

const Person = mongoose.model("people");

const app = express();

app.use(cors());
app.use(bodyParser.json());
morgan.token("type", function(req) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :type")
);

app.get("/info", (req, res) => {
  Person.find({}).then(people => {
    res.send(
      `<p>Puhelinluettelossa ${
        people.length
      } henkilön tiedot</p><p>${Date()}</p>`
    );
  });
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then(people => {
    res.json(people.map(person => person.toJSON()));
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      res.json(person.toJSON());
    })
    .catch(err => next(err));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  const newPerson = new Person({
    name: body.name,
    num: body.num
  });

  newPerson
    .save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON());
    })
    .catch(err => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    num: body.num
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON());
    })
    .catch(err => next(err));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
