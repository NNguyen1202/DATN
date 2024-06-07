const Response = require("../models/responseModel")
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createResponse = asyncHandler(async (req, res) => {
    try {
      const newResponse = await Response.create(req.body);
      res.json(newResponse);
    } catch (error) {
      throw new Error(error);
    }
  });

  const updateResponse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updateResponse = await Response.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updateResponse);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const deleteResponse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deleteResponse = await Response.findByIdAndDelete(id);
      res.json(deleteResponse);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getResponse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const get1Response = await Response.findById(id);
      res.json(get1Response);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getAllResponse = asyncHandler(async (req, res) => {
    try {
      const getAllResponse = await Response.find();
      res.json(getAllResponse);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  module.exports = {
    createResponse,
    updateResponse,
    deleteResponse,
    getResponse,
    getAllResponse,
  };