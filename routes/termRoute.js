const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

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
 *             type: object
 *             properties:
 *               contractID:
 *                 type: string
 *               contractName:
 *                 type: string
 *               description:
 *                 type: string
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
 *     summary: Update a term
 *     tags: [Term]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The term ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contractID:
 *                 type: string
 *               contractName:
 *                 type: string
 *               description:
 *                 type: string
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
 *     summary: Delete a term
 *     tags: [Term]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The term ID
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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   contractID:
 *                     type: string
 *                   contractName:
 *                     type: string
 *                   description:
 *                     type: string
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
 *         description: The term ID
 *     responses:
 *       200:
 *         description: Term details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: string
 *                   contractID:
 *                     type: string
 *                   contractName:
 *                     type: string
 *                   description:
 *                     type: string
 */
router.get("/:id", authMiddleware, getTerm);

module.exports = router;
