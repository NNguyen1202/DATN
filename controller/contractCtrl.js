const Contract = require("../models/contractModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const path = require("path");
const fs = require("fs");

const createContract = asyncHandler(async (req, res) => {
  try {
    const newContract = await Contract.create(req.body);
    res.json(newContract);
  } catch (error) {
    throw new Error(error);
  }
});

const updateContract = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateContract = await Contract.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateContract);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteContract = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteContract = await Contract.findByIdAndDelete(id);
    res.json(deleteContract);
  } catch (error) {
    throw new Error(error);
  }
});

const getContract = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const get1Contract = await Contract.findById(id);
    res.json(get1Contract);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllContract = asyncHandler(async (req, res) => {
  try {
    const getAllCon = (await Contract.find());
    res.json(getAllCon);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadFilePdf = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const contract = await Contract.findById(id);
    if (!contract) {
      res.status(404).json({ message: "Contract not found" });
      return;
    }

    if (req.file) {
      // Save the file path in the urlUpload field
      console.log(contract.urlUpload);
      const filePath = path.join("uploads", req.file.filename).replace(/\\/g, '/');
      contract.urlUpload = filePath;
      await contract.save();
      res.json({ message: "File uploaded successfully", filePath: filePath });
    } else {
      res.status(400).json({ message: "No file uploaded" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createContract,
  updateContract,
  deleteContract,
  getContract,
  getAllContract,
  uploadFilePdf,
};
