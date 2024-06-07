const PostInfo = require("../models/postInfoModel")
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createPostInfo = asyncHandler(async (req, res) => {
    try {
      const newPostInfo = await PostInfo.create(req.body);
      res.json(newPostInfo);
    } catch (error) {
      throw new Error(error);
    }
  });

  const updatePostInfo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updatePostInfo = await PostInfo.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatePostInfo);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const deletePostInfo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deletePostInfo = await PostInfo.findByIdAndDelete(id);
      res.json(deletePostInfo);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getPostInfo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const get1PostInfo = await PostInfo.findById(id);
      res.json(get1PostInfo);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getAllPostInfo = asyncHandler(async (req, res) => {
    try {
      const getAllPostInfo = await PostInfo.find();
      res.json(getAllPostInfo);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  module.exports = {
    createPostInfo,
    updatePostInfo,
    deletePostInfo,
    getPostInfo,
    getAllPostInfo,
  };