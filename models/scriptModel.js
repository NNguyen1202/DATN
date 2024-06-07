const mongoose = require("mongoose"); // Erase if already required
const moment = require("moment-timezone");

// Declare the Schema of the Mongo model
var scriptSchema = new mongoose.Schema({
  taskID: {
    type: mongoose.Schema.ObjectId,
    ref: "Task",
  },
  title: {
    type: String,
    required: true,
  },
  timeline: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  cameraAngle: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  contentImgUrl: [],
  version: {
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
  });

//Export the model
module.exports = mongoose.model("Script", scriptSchema);
