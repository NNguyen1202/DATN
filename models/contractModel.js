const { Int32 } = require("mongodb");
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var contractSchema = new mongoose.Schema({
  brandID: {
    type: mongoose.Schema.ObjectId,
    ref: "Brand",
  },
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  termID: {
    type: mongoose.Schema.ObjectId,
    ref: "Term",
  },
  title: {
    type: String,
    required: true,
  },
  minViews: {
    type: Number,
    required: true,
  },
  minLikes: {
    type: Number,
    required: true,
  },
  minShares: {
    type: Number,
    required: true,
  },
  minComments: {
    type: Number,
    required: true,
  },
  urlUpload: [],
  startDate: {
    type: Date,
    required: true,
  },
  endDate1: {
    type: Date,
    required: true,
  },
  endDate2: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Contract", contractSchema);
