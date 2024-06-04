const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const path = require("path");
const fs = require("fs");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const newProd = await Product.create(req.body);
    res.json(newProd);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateProd = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateProd);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteProd = await Product.findByIdAndDelete(id);
    res.json(deleteProd);
  } catch (error) {
    throw new Error(error);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const get1Prod = await Product.findById(id);
    res.json(get1Prod);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const getAllProd = await Product.find();
    res.json(getAllProd);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const product = await Product.findById(id);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
  
      if (req.file) {
        // Save the new image URL
        const filePath = path.join("images", req.file.filename).replace(/\\/g, '/');
        product.productImgUrl = filePath;
        await product.save();
        res.json({ message: "File uploaded successfully", filePath: filePath });
      } else {
        res.status(400).json({ message: "No file uploaded" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
  uploadImage,
};
