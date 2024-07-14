const express = require("express");
const router = express.Router();
const { authMiddleware, isBA } = require("../middlewares/authMiddleware");
const {
  createProdDetail,
  updateProdDetail,
  deleteProdDetail,
  getProdDetail,
  getAllProdDetail,
} = require("../controller/productDetailCtrl");

/**
 * @swagger
 * tags:
 *   name: ProdDetail
 *   description: Product Detail management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProdDetail:
 *       type: object
 *       required:
 *         - productID
 *         - characteristic
 *         - gender
 *         - age
 *         - skinType
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product detail
 *         productID:
 *           type: string
 *           description: ID of the product
 *         characteristic:
 *           type: string
 *           description: Characteristics of the product
 *         gender:
 *           type: string
 *           description: Gender suitability of the product
 *         age:
 *           type: string
 *           description: Age suitability of the product
 *         skinType:
 *           type: string
 *           description: Skin type suitability of the product
 *         createdAt:
 *           type: string
 *           description: Date when the product detail was created
 *         updatedAt:
 *           type: string
 *           description: Date when the product detail was last updated
 *       example:
 *         productID: 60b7253a3f48ab3a6c8e1234
 *         characteristic: Oily
 *         gender: Male
 *         age: 20-30
 *         skinType: Oily
 */

/**
 * @swagger
 * /api/productDetail/create:
 *   post:
 *     summary: Create a new product detail
 *     tags: [ProdDetail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdDetail'
 *     responses:
 *       201:
 *         description: The product detail was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProdDetail'
 *       500:
 *         description: Some server error
 */
router.post("/create", authMiddleware, isBA, createProdDetail);

/**
 * @swagger
 * /api/productDetail/{id}:
 *   put:
 *     summary: Update a product detail
 *     tags: [ProdDetail]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product detail id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdDetail'
 *     responses:
 *       200:
 *         description: The product detail was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProdDetail'
 *       404:
 *         description: The product detail was not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", authMiddleware, isBA, updateProdDetail);

/**
 * @swagger
 * /api/productDetail/{id}:
 *   delete:
 *     summary: Remove a product detail
 *     tags: [ProdDetail]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product detail id
 *     responses:
 *       200:
 *         description: The product detail was deleted
 *       404:
 *         description: The product detail was not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", authMiddleware, isBA, deleteProdDetail);

/**
 * @swagger
 * /api/productDetail/allproductdetail:
 *   get:
 *     summary: Get all product details
 *     tags: [ProdDetail]
 *     responses:
 *       200:
 *         description: A list of product details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProdDetail'
 *       500:
 *         description: Some server error
 */
router.get("/allproductdetail", authMiddleware, getAllProdDetail);

/**
 * @swagger
 * /api/productDetail/{id}:
 *   get:
 *     summary: Get a product detail by id
 *     tags: [ProdDetail]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product detail id
 *     responses:
 *       200:
 *         description: The product detail description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProdDetail'
 *       404:
 *         description: The product detail was not found
 *       500:
 *         description: Some server error
 */
router.get("/:id", authMiddleware, getProdDetail);

module.exports = router;
