const ProdDetail = require("../models/fashionProductDetailModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createFashionProductDetail = asyncHandler(async (req, res) => {
  try {
    const newProdDetail = await ProdDetail.create(req.body);
    res.json(newProdDetail);
  } catch (error) {
    throw new Error(error);
  }
});

const updateFashionProductDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateProdDetail = await ProdDetail.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateProdDetail);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteFashionProductDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedProdDetail = await ProdDetail.findByIdAndDelete(id);
    res.json(deletedProdDetail);
  } catch (error) {
    throw new Error(error);
  }
});

const getFashionProductDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaProdDetail = await ProdDetail.findById(id);
    res.json(getaProdDetail);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllFashionProductDetail = asyncHandler(async (req, res) => {
  try {
    const getallProdDetail = await ProdDetail.find();
    res.json(getallProdDetail);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createFashionProductDetail,
  updateFashionProductDetail,
  deleteFashionProductDetail,
  getFashionProductDetail,
  getAllFashionProductDetail,
};
