const MomoMethod = require("../models/momoMethodModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createMomoMethod = asyncHandler(async (req, res) => {
  try {
    const newMomoMethod = await MomoMethod.create(req.body);
    res.json(newMomoMethod);
  } catch (error) {
    throw new Error(error);
  }
});

const updateMomoMethod = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateMomoMethod = await MomoMethod.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateMomoMethod);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteMomoMethod = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedMomoMethod = await MomoMethod.findByIdAndDelete(id);
    res.json(deletedMomoMethod);
  } catch (error) {
    throw new Error(error);
  }
});

const getMomoMethod = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaMomoMethod = await MomoMethod.findById(id);
    res.json(getaMomoMethod);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllMomoMethod = asyncHandler(async (req, res) => {
  try {
    const getallMomoMethod = await MomoMethod.find();
    res.json(getallMomoMethod);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createMomoMethod,
  updateMomoMethod,
  deleteMomoMethod,
  getMomoMethod,
  getAllMomoMethod,
};
