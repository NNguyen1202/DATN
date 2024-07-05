const express = require("express");
const router = express.Router();
const { authMiddleware, isBA } = require("../middlewares/authMiddleware");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
  uploadImage,
} = require("../controller/productCtrl");
const upload = require("../middlewares/uploadPdfMiddleware");

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */

/**
 * @swagger
 * /api/product/createproduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandID:
 *                 type: string
 *               prodCategoryID:
 *                 type: string
 *               productName:
 *                 type: string
 *               productDescription:
 *                 type: string
 *               productImgUrl:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/createproduct", authMiddleware, isBA, createProduct);

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandID:
 *                 type: string
 *               prodCategoryID:
 *                 type: string
 *               productName:
 *                 type: string
 *               productDescription:
 *                 type: string
 *               productImgUrl:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authMiddleware, isBA, updateProduct);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/:id", authMiddleware, isBA, deleteProduct);

/**
 * @swagger
 * /api/product/allprod:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   brandID:
 *                     type: string
 *                   prodCategoryID:
 *                     type: string
 *                   productName:
 *                     type: string
 *                   productDescription:
 *                     type: string
 *                   productImgUrl:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get("/allprod", authMiddleware, getAllProduct);

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brandID:
 *                   type: string
 *                 prodCategoryID:
 *                   type: string
 *                 productName:
 *                   type: string
 *                 productDescription:
 *                   type: string
 *                 productImgUrl:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get("/:id", authMiddleware, getProduct);

/**
 * @swagger
 * /api/product/{id}/upload:
 *   post:
 *     summary: Upload an image for a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: Invalid input
 */
router.post("/:id/upload", authMiddleware, isBA, upload.single('image'), uploadImage);

module.exports = router;
