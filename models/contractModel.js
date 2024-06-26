const mongoose = require("mongoose");
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
    get: (v) => moment(v).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss'),
    set: (v) => moment(v, 'DD/MM/YYYY HH:mm:ss').tz('Asia/Ho_Chi_Minh').toDate()
  },
  endDate1: {
    type: Date,
    required: true,
    get: (v) => moment(v).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss'),
    set: (v) => moment(v, 'DD/MM/YYYY HH:mm:ss').tz('Asia/Ho_Chi_Minh').toDate()
  },
  endDate2: {
    type: Date,
    required: true,
    get: (v) => moment(v).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss'),
    set: (v) => moment(v, 'DD/MM/YYYY HH:mm:ss').tz('Asia/Ho_Chi_Minh').toDate()
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
      ret.startDate = moment(ret.startDate).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss');
      ret.endDate1 = moment(ret.endDate1).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss');
      ret.endDate2 = moment(ret.endDate2).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss');
      return ret;
    }
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.createdAt = moment(ret.createdAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss');
      ret.updatedAt = moment(ret.updatedAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss');
      ret.startDate = moment(ret.startDate).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss');
      ret.endDate1 = moment(ret.endDate1).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss');
      ret.endDate2 = moment(ret.endDate2).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss');
      return ret;
    }
  }
});

//Export the model
module.exports = mongoose.model("Contract", contractSchema);
