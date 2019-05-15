const mongoose = require("mongoose");
const { Schema } = mongoose;

if (process.argv.length < 3) {
  console.log("Anna salasana");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://vulle:${password}@fullstack2019-himhi.mongodb.net/phonebook-app-dev?retryWrites=true`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new Schema({
  name: String,
  num: String
});

mongoose.model("people", personSchema);

const Person = mongoose.model("people");

if (process.argv[3] || process.argv[4]) {
  new Person({ name: process.argv[3], num: process.argv[4] })
    .save()
    .then(() => {
      console.log(
        `lisätään ${process.argv[3]} numero ${process.argv[4]} luetteloon`
      );
      mongoose.connection.close();
    });
} else if (process.argv.length > 2) {
  console.log("Puhelinluettelo");
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.num}`);
    });
    mongoose.connection.close();
  });
} else {
  console.log("tarkasta antamasi argumentit");
  process.exit(1);
}
