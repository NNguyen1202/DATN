const Post = require("../models/postModel")
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createPost = asyncHandler(async (req, res) => {
    try {
      const newPost = await Post.create(req.body);
      res.json(newPost);
    } catch (error) {
      throw new Error(error);
    }
  });

  const updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updatePost = await Post.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatePost);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deletePost = await Post.findByIdAndDelete(id);
      res.json(deletePost);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const get1Post = await Post.findById(id);
      res.json(get1Post);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getAllPost = asyncHandler(async (req, res) => {
    try {
      const getAllPost = await Post.find();
      res.json(getAllPost);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getAllPost,
  };