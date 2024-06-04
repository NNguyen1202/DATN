const express = require("express");
const {
  createContract,
  updateContract,
  deleteContract,
  getContract,
  getAllContract,
  uploadFilePdf
} = require("../controller/contractCtrl");
const router = express.Router();
const upload = require('../middlewares/uploadPdfMiddleware');

router.post("/createcontract", createContract);
router.put("/:id", updateContract);
router.delete("/:id", deleteContract);
router.get("/allcontracts", getAllContract);
router.get("/:id", getContract);

// Route for uploading PDF file
router.post('/:id/upload', upload.single('pdf'), uploadFilePdf);

module.exports = router;
