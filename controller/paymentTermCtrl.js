const PaymentTerm = require("../models/paymentTermModel")
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createPaymentTerm = asyncHandler(async (req, res) => {
    try {
      const newPaymentTerm = await PaymentTerm.create(req.body);
      res.json(newPaymentTerm);
    } catch (error) {
      throw new Error(error);
    }
  });

  const updatePaymentTerm = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updatePaymentTerm = await PaymentTerm.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatePaymentTerm);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const deletePaymentTerm = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deletePaymentTerm = await PaymentTerm.findByIdAndDelete(id);
      res.json(deletePaymentTerm);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getPaymentTerm = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const get1PaymentTerm = await PaymentTerm.findById(id);
      res.json(get1PaymentTerm);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getAllPaymentTerm = asyncHandler(async (req, res) => {
    try {
      const getAllPaymentTerm = await PaymentTerm.find();
      res.json(getAllPaymentTerm);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  module.exports = {
    createPaymentTerm,
    updatePaymentTerm,
    deletePaymentTerm,
    getPaymentTerm,
    getAllPaymentTerm,
  };