const mongoose = require("mongoose"); // Erase if already required
const moment = require("moment-timezone");

// Declare the Schema of the Mongo model
var prodSchema = new mongoose.Schema({
  contractID: {
    type: mongoose.Schema.ObjectId,
    ref: "Contract",
  },
  prodCategoryID:{
    type: mongoose.Schema.ObjectId,
    ref: "ProdCategory",
  },
  prodDetailID:{
    type: mongoose.Schema.ObjectId,
    ref: "ProdDetail",
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImgUrl:[],
productDetail: {
  type: String,
  required: true,
},
productIngredient: {
  type: String,
  required: true,
},
productUses: {
  type: String,
  required: true,
},
productUsage: {
  type: String,
  required: true,
},
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.createdAt = moment(ret.createdAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss');
      ret.updatedAt = moment(ret.updatedAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss');
      return ret;
    }
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.createdAt = moment(ret.createdAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss');
      ret.updatedAt = moment(ret.updatedAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss');
      return ret;
    }
  }
});

//Export the model
module.exports = mongoose.model("Product", prodSchema);
