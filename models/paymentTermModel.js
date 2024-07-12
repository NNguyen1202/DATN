const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var paymentTermSchema = new mongoose.Schema({
    termID:{
        type: mongoose.Types.ObjectId,
        ref: "Term"
    },
    minstonePaid:{
        type:String,
        required:true,
    },
    datePaid:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        required:true,
    }
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
});

//Export the model
module.exports = mongoose.model('PaymentTerm', paymentTermSchema);