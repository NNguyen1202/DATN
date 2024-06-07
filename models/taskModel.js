const mongoose = require("mongoose"); // Erase if already required
const moment = require("moment-timezone");

// Declare the Schema of the Mongo model
var taskSchema = new mongoose.Schema(
  {
    assignmentID: {
      type: mongoose.Schema.ObjectId,
      ref: "Assignment",
    },
    contractID: {
      type: mongoose.Schema.ObjectId,
      ref: "Contract",
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    equipment: {
      type: String,
      required: true,
    },
    wardrobe: {
      type: String,
      required: true,
    },
    postProductDetail: {
      type: String,
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
  }
);

//Export the model
module.exports = mongoose.model("Task", taskSchema);
