const express = require("express");
const router = express.Router();
const { authMiddleware, isBA } = require("../middlewares/authMiddleware");
const {
  createCosmeticProdDetail,
  updateCosmeticProdDetail,
  deleteCosmeticProdDetail,
  getCosmeticProdDetail,
  getAllCosmeticProdDetail,
} = require("../controller/cosmeticProductDetailCtrl");

/**
 * @swagger
 * tags:
 *   name: CosmeticProdDetail
 *   description: Cosmetic Product Detail management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CosmeticProdDetail:
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
 *           format: date-time
 *           description: Date when the product detail was created
 *         updatedAt:
 *           type: string
 *           format: date-time
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
 * /api/cosmeticProdDetail/create:
 *   post:
 *     summary: Create a new cosmetic product detail
 *     tags: [CosmeticProdDetail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CosmeticProdDetail'
 *     responses:
 *       201:
 *         description: The cosmetic product detail was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CosmeticProdDetail'
 *       500:
 *         description: Some server error
 */
router.post("/create", authMiddleware, isBA, createCosmeticProdDetail);

/**
 * @swagger
 * /api/cosmeticProdDetail/{id}:
 *   put:
 *     summary: Update a cosmetic product detail
 *     tags: [CosmeticProdDetail]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The cosmetic product detail id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CosmeticProdDetail'
 *     responses:
 *       200:
 *         description: The cosmetic product detail was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CosmeticProdDetail'
 *       404:
 *         description: The cosmetic product detail was not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", authMiddleware, isBA, updateCosmeticProdDetail);

/**
 * @swagger
 * /api/cosmeticProdDetail/{id}:
 *   delete:
 *     summary: Remove a cosmetic product detail
 *     tags: [CosmeticProdDetail]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The cosmetic product detail id
 *     responses:
 *       200:
 *         description: The cosmetic product detail was deleted
 *       404:
 *         description: The cosmetic product detail was not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", authMiddleware, isBA, deleteCosmeticProdDetail);

/**
 * @swagger
 * /api/cosmeticProdDetail/allcosmeticproductdetail:
 *   get:
 *     summary: Get all cosmetic product details
 *     tags: [CosmeticProdDetail]
 *     responses:
 *       200:
 *         description: A list of cosmetic product details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CosmeticProdDetail'
 *       500:
 *         description: Some server error
 */
router.get("/allcosmeticproductdetail", authMiddleware, getAllCosmeticProdDetail);

/**
 * @swagger
 * /api/cosmeticProdDetail/{id}:
 *   get:
 *     summary: Get a cosmetic product detail by id
 *     tags: [CosmeticProdDetail]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The cosmetic product detail id
 *     responses:
 *       200:
 *         description: The cosmetic product detail description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CosmeticProdDetail'
 *       404:
 *         description: The cosmetic product detail was not found
 *       500:
 *         description: Some server error
 */
router.get("/:id", authMiddleware, getCosmeticProdDetail);

module.exports = router;
