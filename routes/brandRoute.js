const express = require("express");
const router = express.Router();
const { isBA, authMiddleware } = require("../middlewares/authMiddleware");

const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrand,
} = require("../controller/brandCtrl");

router.post("/createbrand", authMiddleware, isBA, createBrand);
router.put("/:id", authMiddleware, isBA, updateBrand);
router.delete(":id", authMiddleware, isBA, deleteBrand);
router.get("/allbrand", authMiddleware, getAllBrand);
router.get("/:id", authMiddleware, getBrand);

module.exports = router;
