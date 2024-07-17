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
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         contractID:
 *           type: string
 *           description: The ID of the contract associated with the product
 *         prodCategoryID:
 *           type: string
 *           description: The ID of the product category
 *         productName:
 *           type: string
 *           required: true
 *           description: The name of the product
 *         productDescription:
 *           type: string
 *           required: true
 *           description: Description of the product
 *         productImgUrl:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs of product images
 *         productIngredient:
 *           type: string
 *           required: true
 *           description: Ingredients used in the product
 *         productUses:
 *           type: string
 *           required: true
 *           description: Uses or applications of the product
 *         productUsage:
 *           type: string
 *           required: true
 *           description: Instructions for using the product
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update timestamp
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
 *             $ref: '#/components/schemas/Product'
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
 *             $ref: '#/components/schemas/Product'
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
 *                 $ref: '#/components/schemas/Product'
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
 *               $ref: '#/components/schemas/Product'
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
