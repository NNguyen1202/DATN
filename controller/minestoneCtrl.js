const Minestone = require("../models/minestoneModel")
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createMinestone = asyncHandler(async (req, res) => {
    try {
      const newMinestone = await Minestone.create(req.body);
      res.json(newMinestone);
    } catch (error) {
      throw new Error(error);
    }
  });

  const updateMinestone = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updateMinestone = await Minestone.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updateMinestone);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const deleteMinestone = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deleteMinestone = await Minestone.findByIdAndDelete(id);
      res.json(deleteMinestone);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getMinestone = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const get1Minestone = await Minestone.findById(id);
      res.json(get1Minestone);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getAllMinestone = asyncHandler(async (req, res) => {
    try {
      const getAllMinestone = await Minestone.find();
      res.json(getAllMinestone);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  module.exports = {
    createMinestone,
    updateMinestone,
    deleteMinestone,
    getMinestone,
    getAllMinestone,
  };