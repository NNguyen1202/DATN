const Script = require("../models/scriptModel")
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createScript = asyncHandler(async (req, res) => {
    try {
      const newScript = await Script.create(req.body);
      res.json(newScript);
    } catch (error) {
      throw new Error(error);
    }
  });

  const updateScript = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updateScript = await Script.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updateScript);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const deleteScript = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deleteScript = await Script.findByIdAndDelete(id);
      res.json(deleteScript);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getScript = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const get1Script = await Script.findById(id);
      res.json(get1Script);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getAllScript = asyncHandler(async (req, res) => {
    try {
      const getAllScript = await Script.find();
      res.json(getAllScript);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  module.exports = {
    createScript,
    updateScript,
    deleteScript,
    getScript,
    getAllScript,
  };