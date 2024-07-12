const Penalty = require("../models/penaltyModel")
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createPenalty = asyncHandler(async (req, res) => {
    try {
      const newPenalty = await Penalty.create(req.body);
      res.json(newPenalty);
    } catch (error) {
      throw new Error(error);
    }
  });

  const updatePenalty = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updatePenalty = await Penalty.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatePenalty);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const deletePenalty = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deletePenalty = await Penalty.findByIdAndDelete(id);
      res.json(deletePenalty);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getPenalty = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const get1Penalty = await Penalty.findById(id);
      res.json(get1Penalty);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getAllPenalty = asyncHandler(async (req, res) => {
    try {
      const getAllPenalty = await Penalty.find();
      res.json(getAllPenalty);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  module.exports = {
    createPenalty,
    updatePenalty,
    deletePenalty,
    getPenalty,
    getAllPenalty,
  };