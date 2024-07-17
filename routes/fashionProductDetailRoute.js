const express = require("express");
const router = express.Router();
const { authMiddleware, isBA } = require("../middlewares/authMiddleware");
const {
  createFashionProductDetail,
  updateFashionProductDetail,
  deleteFashionProductDetail,
  getFashionProductDetail,
  getAllFashionProductDetail,
} = require("../controller/fashionProductDetailCtrl");

/**
 * @swagger
 * components:
 *   schemas:
 *     FashionProductDetail:
 *       type: object
 *       required:
 *         - meterial
 *         - size
 *         - gender
 *       properties:
 *         productID:
 *           type: string
 *           description: The product ID
 *         meterial:
 *           type: string
 *           description: The material of the product
 *         size:
 *           type: string
 *           description: The size of the product
 *         gender:
 *           type: string
 *           description: The gender for the product
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update date
 */

/**
 * @swagger
 * tags:
 *   name: FashionProductDetails
 *   description: Fashion Product Details management
 */

/**
 * @swagger
 * /api/fashionProdDetail/create:
 *   post:
 *     summary: Create a new fashion product detail
 *     tags: [FashionProductDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FashionProductDetail'
 *     responses:
 *       200:
 *         description: The fashion product detail was successfully created
 *       500:
 *         description: Some server error
 */
router.post("/create", authMiddleware, isBA, createFashionProductDetail);

/**
 * @swagger
 * /api/fashionProdDetail/{id}:
 *   put:
 *     summary: Update a fashion product detail
 *     tags: [FashionProductDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The fashion product detail id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FashionProductDetail'
 *     responses:
 *       200:
 *         description: The fashion product detail was successfully updated
 *       404:
 *         description: The fashion product detail was not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", authMiddleware, isBA, updateFashionProductDetail);

/**
 * @swagger
 * /api/fashionProdDetail/{id}:
 *   delete:
 *     summary: Delete a fashion product detail
 *     tags: [FashionProductDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The fashion product detail id
 *     responses:
 *       200:
 *         description: The fashion product detail was successfully deleted
 *       404:
 *         description: The fashion product detail was not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", authMiddleware, isBA, deleteFashionProductDetail);

/**
 * @swagger
 * /api/fashionProdDetail/allfashionproductdetail:
 *   get:
 *     summary: Get all fashion product details
 *     tags: [FashionProductDetails]
 *     responses:
 *       200:
 *         description: List of all fashion product details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FashionProductDetail'
 *       500:
 *         description: Some server error
 */
router.get("/allfashionproductdetail", authMiddleware, getAllFashionProductDetail);

/**
 * @swagger
 * /api/fashionProdDetail/{id}:
 *   get:
 *     summary: Get a fashion product detail by id
 *     tags: [FashionProductDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The fashion product detail id
 *     responses:
 *       200:
 *         description: The fashion product detail description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FashionProductDetail'
 *       404:
 *         description: The fashion product detail was not found
 *       500:
 *         description: Some server error
 */
router.get("/:id", authMiddleware, getFashionProductDetail);

module.exports = router;
