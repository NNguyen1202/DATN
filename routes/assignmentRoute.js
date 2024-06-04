const express = require("express");
const router = express.Router();
const {
  isBA,
  isCA,
  isMA,
  authMiddleware,
} = require("../middlewares/authMiddleware");

const {
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignment,
  getallAssignment,
} = require("../controller/assignmentCtrl");

//brand assistant api
router.post("/brand-assistant", authMiddleware, isBA, createAssignment);
router.put("/brand-assistant/:id", authMiddleware, isBA, updateAssignment);
router.delete("/brand-assistant/:id", authMiddleware, isBA, deleteAssignment);
router.get("/brand-assistant", authMiddleware, isBA, getallAssignment);
router.get("/brand-assistant/:id", authMiddleware, isBA, getAssignment);

//content assistant api
router.post("/content-assistant", authMiddleware, isCA, createAssignment);
router.put("/content-assistant/:id", authMiddleware, isCA, updateAssignment);
router.delete("/content-assistant/:id", authMiddleware, isCA, deleteAssignment);
router.get("/content-assistant", authMiddleware, isCA, getallAssignment);
router.get("/content-assistant/:id", authMiddleware, isCA, getAssignment);

//media assistant api
router.post("/media-assisstant", authMiddleware, isMA, createAssignment);
router.put("/media-assisstant/:id", authMiddleware, isMA, updateAssignment);
router.delete("/media-assisstant/:id", authMiddleware, isMA, deleteAssignment);
router.get("/media-assisstant", authMiddleware, isMA, getallAssignment);
router.get("/media-assisstant/:id", authMiddleware, isMA, getAssignment);

module.exports = router;
