const express = require("express");
const router = express.Router();

const {
  createTerm,
  updateTerm,
  deleteTerm,
  getTerm,
  getAllTerm,
} = require("../controller/termCtrl");

router.post("/createterm", createTerm);
router.put("/:id", updateTerm);
router.delete("/:id", deleteTerm);
router.get("/allterm", getAllTerm);
router.get("/:id", getTerm);

module.exports = router;
