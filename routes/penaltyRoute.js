const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { authMiddleware } = require("../middlewares/authMiddleware");
const Penalty = require("../models/penaltyModel");
const validateMongoDbId = require("../utils/validateMongodbId");

const {
  createPenalty,
  updatePenalty,
  deletePenalty,
  getPenalty,
  getAllPenalty,
} = require("../controller/penaltyCtrl");

/**
 * @swagger
 * components:
 *   schemas:
 *     Penalty:
 *       type: object
 *       properties:
 *         paymentTermID:
 *           type: string
 *           description: The ID of the payment term associated with the penalty
 *         penaltyPaid:
 *           type: string
 *           required: true
 *           description: Amount paid as penalty
 */

/**
 * @swagger
 * /api/penalty:
 *   post:
 *     summary: Create a new penalty
 *     tags: [Penalty]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Penalty'
 *     responses:
 *       200:
 *         description: Penalty created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", authMiddleware, createPenalty);

/**
 * @swagger
 * /api/penalty/{id}:
 *   put:
 *     summary: Update a penalty by ID
 *     tags: [Penalty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the penalty to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Penalty'
 *     responses:
 *       200:
 *         description: Penalty updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authMiddleware, updatePenalty);

/**
 * @swagger
 * /api/penalty/{id}:
 *   delete:
 *     summary: Delete a penalty by ID
 *     tags: [Penalty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the penalty to delete
 *     responses:
 *       200:
 *         description: Penalty deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/:id", authMiddleware, deletePenalty);

/**
 * @swagger
 * /api/penalty/allpenalty:
 *   get:
 *     summary: Get all penalties
 *     tags: [Penalty]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of penalties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Penalty'
 */
router.get("/allpenalty", authMiddleware, getAllPenalty);

/**
 * @swagger
 * /api/penalty/{id}:
 *   get:
 *     summary: Get a penalty by ID
 *     tags: [Penalty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the penalty to retrieve
 *     responses:
 *       200:
 *         description: Penalty details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Penalty'
 */
router.get("/:id", authMiddleware, getPenalty);

module.exports = router;
