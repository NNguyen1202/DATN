const Term = require("../models/termModel")
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createTerm = asyncHandler(async (req, res) => {
    try {
      const newTerm = await Term.create(req.body);
      res.json(newTerm);
    } catch (error) {
      throw new Error(error);
    }
  });

  const updateTerm = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updateTerm = await Term.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updateTerm);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const deleteTerm = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deleteTerm = await Term.findByIdAndDelete(id);
      res.json(deleteTerm);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getTerm = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const get1Term = await Term.findById(id);
      res.json(get1Term);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getAllTerm = asyncHandler(async (req, res) => {
    try {
      const getAllTerm = await Term.find();
      res.json(getAllTerm);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  module.exports = {
    createTerm,
    updateTerm,
    deleteTerm,
    getTerm,
    getAllTerm,
  };