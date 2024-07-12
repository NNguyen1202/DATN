const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { authMiddleware } = require("../middlewares/authMiddleware");
const Minestone = require("../models/minestoneModel");
const validateMongoDbId = require("../utils/validateMongodbId");

const {
  createMinestone,
  updateMinestone,
  deleteMinestone,
  getMinestone,
  getAllMinestone,
} = require("../controller/minestoneCtrl");

/**
 * @swagger
 * tags:
 *   name: Minestone
 *   description: Minestone management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Minestone:
 *       type: object
 *       properties:
 *         paymentTermID:
 *           type: string
 *           description: The ID of the payment term associated with the minestone
 *         views:
 *           type: string
 *           description: Number of views
 *         likes:
 *           type: string
 *           description: Number of likes
 *         shares:
 *           type: string
 *           description: Number of shares
 *         comments:
 *           type: string
 *           description: Number of comments
 */

/**
 * @swagger
 * /api/minestone:
 *   post:
 *     summary: Create a new minestone
 *     tags: [Minestone]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Minestone'
 *     responses:
 *       200:
 *         description: Minestone created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", authMiddleware, createMinestone);

/**
 * @swagger
 * /api/minestone/{id}:
 *   put:
 *     summary: Update a minestone by ID
 *     tags: [Minestone]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the minestone to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Minestone'
 *     responses:
 *       200:
 *         description: Minestone updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authMiddleware, updateMinestone);

/**
 * @swagger
 * /api/minestone/{id}:
 *   delete:
 *     summary: Delete a minestone by ID
 *     tags: [Minestone]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the minestone to delete
 *     responses:
 *       200:
 *         description: Minestone deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/:id", authMiddleware, deleteMinestone);

/**
 * @swagger
 * /api/minestone/allminestone:
 *   get:
 *     summary: Get all minestones
 *     tags: [Minestone]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of minestones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Minestone'
 */
router.get("/allminestone", authMiddleware, getAllMinestone);

/**
 * @swagger
 * /api/minestone/{id}:
 *   get:
 *     summary: Get a minestone by ID
 *     tags: [Minestone]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the minestone to retrieve
 *     responses:
 *       200:
 *         description: Minestone details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Minestone'
 */
router.get("/:id", authMiddleware, getMinestone);

module.exports = router;
