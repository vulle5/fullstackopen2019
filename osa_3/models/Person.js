const mongoose = require("mongoose");
const { Schema } = mongoose;
var uniqueValidator = require("mongoose-unique-validator");
const keys = require("../config/keys");

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  num: {
    type: String,
    minlength: 8,
    required: true
  }
});
personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

mongoose.model("people", personSchema);
