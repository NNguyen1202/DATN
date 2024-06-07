const express = require("express");
const router = express.Router();
const { isMA, authMiddleware } = require("../middlewares/authMiddleware");

const {
  createStatistic,
  updateStatistic,
  deleteStatistic,
  getStatistic,
  getAllStatistic,
} = require("../controller/statisticCtrl");

/**
 * @swagger
 * tags:
 *   name: Statistic
 *   description: Statistic management
 */

/**
 * @swagger
 * /api/statistic/createstatistic:
 *   post:
 *     summary: Create a new statistic
 *     tags: [Statistic]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postID:
 *                 type: string
 *               views:
 *                 type: number
 *               likes:
 *                 type: number
 *               comments:
 *                 type: number
 *               shares:
 *                 type: number
 *     responses:
 *       201:
 *         description: Statistic created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/createstatistic", authMiddleware, isMA, createStatistic);

/**
 * @swagger
 * /api/statistic/{id}:
 *   put:
 *     summary: Update a statistic
 *     tags: [Statistic]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The statistic ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postID:
 *                 type: string
 *               views:
 *                 type: number
 *               likes:
 *                 type: number
 *               comments:
 *                 type: number
 *               shares:
 *                 type: number
 *     responses:
 *       200:
 *         description: Statistic updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authMiddleware, isMA, updateStatistic);

/**
 * @swagger
 * /api/statistic/{id}:
 *   delete:
 *     summary: Delete a statistic
 *     tags: [Statistic]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The statistic ID
 *     responses:
 *       200:
 *         description: Statistic deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/:id", authMiddleware, isMA, deleteStatistic);

/**
 * @swagger
 * /api/statistic/all-statistic:
 *   get:
 *     summary: Get all statistics
 *     tags: [Statistic]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   postID:
 *                     type: string
 *                   views:
 *                     type: number
 *                   likes:
 *                     type: number
 *                   comments:
 *                     type: number
 *                   shares:
 *                     type: number
 */
router.get("/all-statistic", authMiddleware, getAllStatistic);

/**
 * @swagger
 * /api/statistic/{id}:
 *   get:
 *     summary: Get a statistic by ID
 *     tags: [Statistic]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The statistic ID
 *     responses:
 *       200:
 *         description: Statistic details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 postID:
 *                   type: string
 *                 views:
 *                   type: number
 *                 likes:
 *                   type: number
 *                 comments:
 *                   type: number
 *                 shares:
 *                   type: number
 */
router.get("/:id", authMiddleware, getStatistic);

module.exports = router;
