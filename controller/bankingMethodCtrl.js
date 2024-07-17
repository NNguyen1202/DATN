const BankingMethod = require("../models/bankingMethodModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createBankingMethod = asyncHandler(async (req, res) => {
  try {
    const newBankingMethod = await BankingMethod.create(req.body);
    res.json(newBankingMethod);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBankingMethod = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBankingMethod = await BankingMethod.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBankingMethod);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBankingMethod = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBankingMethod = await BankingMethod.findByIdAndDelete(id);
    res.json(deletedBankingMethod);
  } catch (error) {
    throw new Error(error);
  }
});

const getBankingMethod = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBankingMethod = await BankingMethod.findById(id);
    res.json(getaBankingMethod);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBankingMethod = asyncHandler(async (req, res) => {
  try {
    const getallBankingMethod = await BankingMethod.find();
    res.json(getallBankingMethod);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBankingMethod,
  updateBankingMethod,
  deleteBankingMethod,
  getBankingMethod,
  getAllBankingMethod,
};
