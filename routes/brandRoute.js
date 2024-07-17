const express = require("express");
const router = express.Router();
const { isBA, authMiddleware } = require("../middlewares/authMiddleware");

const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrand,
} = require("../controller/brandCtrl");

/**
 * @swagger
 * tags:
 *   name: Brand
 *   description: Brand management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - brandName
 *         - brandDescription
 *       properties:
 *         assignmentID:
 *           type: string
 *           description: The ID of the related assignment
 *         brandName:
 *           type: string
 *           description: The name of the brand
 *         brandDescription:
 *           type: string
 *           description: A description of the brand
 *         brandImgUrl:
 *           type: array
 *           items:
 *             type: string
 *           description: List of URLs to brand images
 *         categoryID:
 *           type: string
 *           description: The ID of the related category
 *         contractID:
 *           type: string
 *           description: The ID of the related contract
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date
 */

/**
 * @swagger
 * /api/brand/createbrand:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brand]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       201:
 *         description: Brand created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/createbrand", authMiddleware, isBA, createBrand);

/**
 * @swagger
 * /api/brand/{id}:
 *   put:
 *     summary: Update a brand
 *     tags: [Brand]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authMiddleware, isBA, updateBrand);

/**
 * @swagger
 * /api/brand/{id}:
 *   delete:
 *     summary: Delete a brand
 *     tags: [Brand]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand ID
 *     responses:
 *       200:
 *         description: Brand deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/:id", authMiddleware, isBA, deleteBrand);

/**
 * @swagger
 * /api/brand/allbrand:
 *   get:
 *     summary: Get all brands
 *     tags: [Brand]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 */
router.get("/allbrand", authMiddleware, getAllBrand);

/**
 * @swagger
 * /api/brand/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     tags: [Brand]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand ID
 *     responses:
 *       200:
 *         description: Brand details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 */
router.get("/:id", authMiddleware, getBrand);

module.exports = router;
