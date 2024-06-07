const { Int32 } = require("mongodb");
const mongoose = require("mongoose"); // Erase if already required
const moment = require("moment-timezone");

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
module.exports = mongoose.model("Contract", contractSchema);
