const PaymentMethod = require("../models/paymentMethodModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createPaymentMethod = asyncHandler(async (req, res) => {
  try {
    const newPaymentMethod = await PaymentMethod.create(req.body);
    res.json(newPaymentMethod);
  } catch (error) {
    throw new Error(error);
  }
});

const updatePaymentMethod = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatePaymentMethod = await PaymentMethod.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatePaymentMethod);
  } catch (error) {
    throw new Error(error);
  }
});

const deletePaymentMethod = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedPaymentMethod = await PaymentMethod.findByIdAndDelete(id);
    res.json(deletedPaymentMethod);
  } catch (error) {
    throw new Error(error);
  }
});

const getPaymentMethod = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaPaymentMethod = await PaymentMethod.findById(id);
    res.json(getaPaymentMethod);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllPaymentMethod = asyncHandler(async (req, res) => {
  try {
    const getallPaymentMethod = await PaymentMethod.find();
    res.json(getallPaymentMethod);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  getPaymentMethod,
  getAllPaymentMethod,
};
