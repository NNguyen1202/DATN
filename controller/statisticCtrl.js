const Statistic = require("../models/statisticModel")
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createStatistic = asyncHandler(async (req, res) => {
    try {
      const newStatistic = await Statistic.create(req.body);
      res.json(newStatistic);
    } catch (error) {
      throw new Error(error);
    }
  });

  const updateStatistic = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updateStatistic = await Statistic.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updateStatistic);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const deleteStatistic = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deleteStatistic = await Statistic.findByIdAndDelete(id);
      res.json(deleteStatistic);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getStatistic = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const get1Statistic = await Statistic.findById(id);
      res.json(get1Statistic);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getAllStatistic = asyncHandler(async (req, res) => {
    try {
      const getAllStatistic = await Statistic.find();
      res.json(getAllStatistic);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  module.exports = {
    createStatistic,
    updateStatistic,
    deleteStatistic,
    getStatistic,
    getAllStatistic,
  };