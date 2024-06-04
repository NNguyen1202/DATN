const Assignment = require("../models/assignmentModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createAssignment = asyncHandler(async (req, res) => {
  try {
    const newAssignment = await Assignment.create(req.body);
    res.json(newAssignment);
  } catch (error) {
    throw new Error(error);
  }
});

const updateAssignment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateAssignment = await Assignment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateAssignment);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAssignment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(id);
    res.json(deletedAssignment);
  } catch (error) {
    throw new Error(error);
  }
});

const getAssignment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaAssignment = await Assignment.findById(id);
    res.json(getaAssignment);
  } catch (error) {
    throw new Error(error);
  }
});

const getallAssignment = asyncHandler(async (req, res) => {
  try {
    const getallAssignment = await Assignment.find();
    res.json(getallAssignment);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignment,
  getallAssignment,
};
