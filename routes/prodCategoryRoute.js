const express = require("express");
const router = express.Router();
const { isBA, authMiddleware } = require("../middlewares/authMiddleware");

const {
  createProdCategory,
  updateProdCategory,
  deleteProdCategory,
  getProdCategory,
  getAllProdCategory,
} = require("../controller/prodCategoryCtrl");

/**
 * @swagger
 * tags:
 *   name: ProdCategory
 *   description: ProdCategory management
 */

/**
 * @swagger
 * /api/prodcategory/createprodcategory:
 *   post:
 *     summary: Create a new prodcategory
 *     tags: [ProdCategory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               categoryDescription:
 *                 type: string
 *     responses:
 *       201:
 *         description: ProdCategory created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/createprodcategory", authMiddleware, isBA, createProdCategory);

/**
 * @swagger
 * /api/prodcategory/{id}:
 *   put:
 *     summary: Update a prodcategory
 *     tags: [ProdCategory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The prodcategory ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               categoryDescription:
 *                 type: string
 *     responses:
 *       200:
 *         description: ProdCategory updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authMiddleware, isBA, updateProdCategory);

/**
 * @swagger
 * /api/prodcategory/{id}:
 *   delete:
 *     summary: Delete a prodcategory
 *     tags: [ProdCategory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The prodcategory ID
 *     responses:
 *       200:
 *         description: ProdCategory deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/:id", authMiddleware, isBA, deleteProdCategory);

/**
 * @swagger
 * /api/prodcategory/allprodcategory:
 *   get:
 *     summary: Get all prodcategories
 *     tags: [ProdCategory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of prodcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   categoryName:
 *                     type: string
 *                   categoryDescription:
 *                     type: string
 */
router.get("/allprodcategory", authMiddleware, getAllProdCategory);

/**
 * @swagger
 * /api/prodcategory/{id}:
 *   get:
 *     summary: Get a prodcategory by ID
 *     tags: [ProdCategory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The prodcategory ID
 *     responses:
 *       200:
 *         description: ProdCategory details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categoryName:
 *                   type: string
 *                 categoryDescription:
 *                   type: string
 */
router.get("/:id", authMiddleware, getProdCategory);

module.exports = router;
