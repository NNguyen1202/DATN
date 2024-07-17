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
 *   name: Category
 *   description: Category management
 */

/**
 * @swagger
 * /api/category/createcategory:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
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
 *         description: Category created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/createcategory", authMiddleware, isBA, createProdCategory);

/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
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
 *         description: Category updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authMiddleware, isBA, updateProdCategory);

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/:id", authMiddleware, isBA, deleteProdCategory);

/**
 * @swagger
 * /api/category/allcategory:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
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
router.get("/allcategory", authMiddleware, getAllProdCategory);

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category details
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
