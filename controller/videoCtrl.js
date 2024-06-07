const Video = require("../models/videoModel")
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createVideo = asyncHandler(async (req, res) => {
    try {
      const newVideo = await Video.create(req.body);
      res.json(newVideo);
    } catch (error) {
      throw new Error(error);
    }
  });

  const updateVideo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updateVideo = await Video.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updateVideo);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const deleteVideo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deleteVideo = await Video.findByIdAndDelete(id);
      res.json(deleteVideo);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getVideo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const get1Video = await Video.findById(id);
      res.json(get1Video);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getAllVideo = asyncHandler(async (req, res) => {
    try {
      const getAllVideo = await Video.find();
      res.json(getAllVideo);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  module.exports = {
    createVideo,
    updateVideo,
    deleteVideo,
    getVideo,
    getAllVideo,
  };