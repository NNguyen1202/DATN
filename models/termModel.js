const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var termSchema = new mongoose.Schema({
  contractID: {
    type: mongoose.Schema.ObjectId,
    ref: "Contract",
  },
  contractName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Term", termSchema);
