const mongoose = require("mongoose"); // Erase if already required
const moment = require("moment-timezone");

// Declare the Schema of the Mongo model
var postSchema = new mongoose.Schema(
  {
    videoID: {
      type: mongoose.Schema.ObjectId,
      ref: "Video",
    },
    brandID: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    productID: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    assignmentID: {
      type: mongoose.Schema.ObjectId,
      ref: "Assignment",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    postUploadUrl: {
      type: String,
      required: true,
    },
    mediaChannel: {
      type: String,
      required: true,
    },
    facebookPostUrl: {
      type: String,
      required: true,
    },
    postDate: {
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
module.exports = mongoose.model("Post", postSchema);
