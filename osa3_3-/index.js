const express = require("express");
const app = express();

let people = [
  {
    name: "Arto Hellas",
    num: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    num: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    num: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    num: "040-123456",
    id: 4
  }
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Puhelinluettelossa ${people.length} henkilön tiedot</p><p>${Date()}</p>`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(people);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = people.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  people = people.filter(person => person.id !== id);

  res.status(204).end();
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
