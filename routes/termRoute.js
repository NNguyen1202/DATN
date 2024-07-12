const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  createTerm,
  updateTerm,
  deleteTerm,
  getTerm,
  getAllTerm,
} = require("../controller/termCtrl");

/**
 * @swagger
 * tags:
 *   name: Term
 *   description: Term management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Term:
 *       type: object
 *       properties:
 *         contractID:
 *           type: string
 *           description: The ID of the contract associated with the term
 *         description:
 *           type: string
 *           description: Description of the term
 *         payment:
 *           type: string
 *           description: Payment details of the term
 *         paymentMethods:
 *           type: string
 *           description: Payment methods for the term
 *         paymentTermID:
 *           type: string
 *           description: The ID of the payment term associated with the term
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
 * /api/term/createterm:
 *   post:
 *     summary: Create a new term
 *     tags: [Term]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Term'
 *     responses:
 *       201:
 *         description: Term created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/createterm", authMiddleware, createTerm);

/**
 * @swagger
 * /api/term/{id}:
 *   put:
 *     summary: Update a term by ID
 *     tags: [Term]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the term to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Term'
 *     responses:
 *       200:
 *         description: Term updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authMiddleware, updateTerm);

/**
 * @swagger
 * /api/term/{id}:
 *   delete:
 *     summary: Delete a term by ID
 *     tags: [Term]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the term to delete
 *     responses:
 *       200:
 *         description: Term deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/:id", authMiddleware, deleteTerm);

/**
 * @swagger
 * /api/term/allterm:
 *   get:
 *     summary: Get all terms
 *     tags: [Term]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of terms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Term'
 */
router.get("/allterm", authMiddleware, getAllTerm);

/**
 * @swagger
 * /api/term/{id}:
 *   get:
 *     summary: Get a term by ID
 *     tags: [Term]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the term to retrieve
 *     responses:
 *       200:
 *         description: Term details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Term'
 */
router.get("/:id", authMiddleware, getTerm);

module.exports = router;
