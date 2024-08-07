const mongoose = require("mongoose"); // Erase if already required
const moment = require("moment-timezone");

// Declare the Schema of the Mongo model
var termSchema = new mongoose.Schema({
  contractID: {
    type: mongoose.Schema.ObjectId,
    ref: "Contract",
  },
  description: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  paymentTermID: {
    type: mongoose.Schema.ObjectId,
    ref: "PaymentTerm",
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
module.exports = mongoose.model("Term", termSchema);
