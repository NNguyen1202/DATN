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

const getAllBrandAssignment = asyncHandler(async (req, res) => {
  try {
    const assignments = await Assignment.find({}).populate({
      path: 'userID',
      match: { roleID: "666199afd75d4bd81c4aa3e5" },
    }).exec();

    const filteredAssignments = assignments.filter(assignment => assignment.userID !== null);

    res.json(filteredAssignments);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllContentAssignment = asyncHandler(async (req, res) => {
  try {
    const assignments = await Assignment.find({}).populate({
      path: 'userID',
      match: { roleID: "666199bad75d4bd81c4aa3e8" },
    }).exec();

    const filteredAssignments = assignments.filter(assignment => assignment.userID !== null);

    res.json(filteredAssignments);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllMediaAssignment = asyncHandler(async (req, res) => {
  try {
    const assignments = await Assignment.find({}).populate({
      path: 'userID',
      match: { roleID: "666199c1d75d4bd81c4aa3eb" },
    }).exec();

    const filteredAssignments = assignments.filter(assignment => assignment.userID !== null);

    res.json(filteredAssignments);
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
  getAllBrandAssignment,
  getAllContentAssignment,
  getAllMediaAssignment,
};
