const mongoose = require('mongoose'); // Erase if already required
const moment = require("moment-timezone");

// Declare the Schema of the Mongo model
var cosmeticProdDetailSchema = new mongoose.Schema({
    productID:{
        type:mongoose.Schema.ObjectId,
        ref: "Product",
    },
    characteristic:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    skinType:{
        type:String,
        required:true,
    }
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
module.exports = mongoose.model('CosmeticProdDetail', cosmeticProdDetailSchema);