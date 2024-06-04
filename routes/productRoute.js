const express = require("express");
const router = express.Router();

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
  uploadImage,
} = require("../controller/productCtrl");
const upload = require("../middlewares/uploadPdfMiddleware");

router.post("/createproduct", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/allprod", getAllProduct);
router.get("/:id", getProduct);

router.post("/:id/upload", upload.single("image"), uploadImage);

module.exports = router;
