const Category = require("../models/brandCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createBrandCategory = asyncHandler(async (req, res) => {
  try {
    const newBrandCategory = await Category.create(req.body);
    res.json(newBrandCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBrandCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBrandCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBrandCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBrandCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBrandCategory = await Category.findByIdAndDelete(id);
    res.json(deletedBrandCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getBrandCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBrandCategory = await Category.findById(id);
    res.json(getaBrandCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBrandCategory = asyncHandler(async (req, res) => {
  try {
    const getallBrandCategory = await Category.find();
    res.json(getallBrandCategory);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBrandCategory,
  updateBrandCategory,
  deleteBrandCategory,
  getBrandCategory,
  getAllBrandCategory,
};
