const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const moment = require("moment-timezone");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    roleID: {
      type: mongoose.Schema.ObjectId,
      ref: "Role",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Export the model
module.exports = mongoose.model("User", userSchema);
