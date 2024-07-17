const CodMethod = require("../models/codMethodModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCodMethod = asyncHandler(async (req, res) => {
  try {
    const newCodMethod = await CodMethod.create(req.body);
    res.json(newCodMethod);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCodMethod = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCodMethod = await CodMethod.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCodMethod);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCodMethod = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCodMethod = await CodMethod.findByIdAndDelete(id);
    res.json(deletedCodMethod);
  } catch (error) {
    throw new Error(error);
  }
});

const getCodMethod = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCodMethod = await CodMethod.findById(id);
    res.json(getaCodMethod);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCodMethod = asyncHandler(async (req, res) => {
  try {
    const getallCodMethod = await CodMethod.find();
    res.json(getallCodMethod);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCodMethod,
  updateCodMethod,
  deleteCodMethod,
  getCodMethod,
  getAllCodMethod,
};
