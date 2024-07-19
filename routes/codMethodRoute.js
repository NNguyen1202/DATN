const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  createCodMethod,
  updateCodMethod,
  deleteCodMethod,
  getCodMethod,
  getAllCodMethod
} = require("../controller/codMethodCtrl");

/**
 * @swagger
 * components:
 *   schemas:
 *     CodMethod:
 *       type: object
 *       required:
 *         - codMoney
 *       properties:
 *         codMoney:
 *           type: string
 *           description: The amount of money for COD
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
 * tags:
 *   name: CodMethods
 *   description: API for managing COD methods
 */

/**
 * @swagger
 * /api/codMethod/create:
 *   post:
 *     summary: Create a new COD method
 *     tags: [CodMethods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CodMethod'
 *     responses:
 *       200:
 *         description: The created COD method
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CodMethod'
 *       500:
 *         description: Server error
 */
router.post("/create", authMiddleware, createCodMethod);

/**
 * @swagger
 * /api/codMethod/{id}:
 *   put:
 *     summary: Update a COD method
 *     tags: [CodMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The COD method ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CodMethod'
 *     responses:
 *       200:
 *         description: The updated COD method
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CodMethod'
 *       404:
 *         description: COD method not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleware, updateCodMethod);

/**
 * @swagger
 * /api/codMethod/{id}:
 *   delete:
 *     summary: Delete a COD method
 *     tags: [CodMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The COD method ID
 *     responses:
 *       200:
 *         description: The deleted COD method
 *       404:
 *         description: COD method not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", authMiddleware, deleteCodMethod);

/**
 * @swagger
 * /api/codMethod/allcodmethod:
 *   get:
 *     summary: Get all COD methods
 *     tags: [CodMethods]
 *     responses:
 *       200:
 *         description: List of all COD methods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CodMethod'
 *       500:
 *         description: Server error
 */
router.get("/allcodmethod", authMiddleware, getAllCodMethod);

/**
 * @swagger
 * /api/codMethod/{id}:
 *   get:
 *     summary: Get a COD method by ID
 *     tags: [CodMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The COD method ID
 *     responses:
 *       200:
 *         description: The requested COD method
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CodMethod'
 *       404:
 *         description: COD method not found
 *       500:
 *         description: Server error
 */
router.get("/:id", authMiddleware, getCodMethod);

module.exports = router;
