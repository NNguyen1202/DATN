const mongoose = require("mongoose"); // Erase if already required
const moment = require("moment-timezone");

// Declare the Schema of the Mongo model
var facebookPostStatsSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
      unique: true,
    },
    totalComments: {
      type: Number,
      default: 0,
    },
    totalLikes: {
      type: Number,
      default: 0,
    },
    totalShares: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.createdAt = moment(ret.createdAt)
          .tz("Asia/Ho_Chi_Minh")
          .format("DD/MM/YYYY HH:mm:ss");
        ret.updatedAt = moment(ret.updatedAt)
          .tz("Asia/Ho_Chi_Minh")
          .format("DD/MM/YYYY HH:mm:ss");
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.createdAt = moment(ret.createdAt)
          .tz("Asia/Ho_Chi_Minh")
          .format("DD/MM/YYYY HH:mm:ss");
        ret.updatedAt = moment(ret.updatedAt)
          .tz("Asia/Ho_Chi_Minh")
          .format("DD/MM/YYYY HH:mm:ss");
        return ret;
      },
    },
  }
);

//Export the model
module.exports = mongoose.model("FacebookPostStats", facebookPostStatsSchema);
