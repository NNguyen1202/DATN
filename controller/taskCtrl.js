const Task = require("../models/taskModel")
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createTask = asyncHandler(async (req, res) => {
    try {
      const newTask = await Task.create(req.body);
      res.json(newTask);
    } catch (error) {
      throw new Error(error);
    }
  });

  const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updateTask = await Task.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updateTask);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deleteTask = await Task.findByIdAndDelete(id);
      res.json(deleteTask);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const get1Task = await Task.findById(id);
      res.json(get1Task);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const getAllTask = asyncHandler(async (req, res) => {
    try {
      const getAllTask = await Task.find();
      res.json(getAllTask);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getTask,
    getAllTask,
  };