const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var prodSchema = new mongoose.Schema({
  brandID: {
    type: mongoose.Schema.ObjectId,
    ref: "Brand",
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImgUrl:[]
});

//Export the model
module.exports = mongoose.model("Product", prodSchema);
