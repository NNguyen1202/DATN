const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var brandSchema = new mongoose.Schema({
  assignmentID: {
    type: mongoose.Schema.ObjectId,
    ref: "Assignment",
  },
  brandName: {
    type: String,
    required: true,
  },
  brandDescription: {
    type: String,
    required: true,
  },
  contractID: {
    type: mongoose.Schema.ObjectId,
    ref: "Contract",
  },
});

//Export the model
module.exports = mongoose.model("Brand", brandSchema);
