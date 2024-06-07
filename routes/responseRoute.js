const express = require("express");
const router = express.Router();
const { isMA, authMiddleware } = require("../middlewares/authMiddleware");

const {
  createResponse,
  updateResponse,
  deleteResponse,
  getResponse,
  getAllResponse,
} = require("../controller/responseCtrl");

/**
 * @swagger
 * tags:
 *   name: Response
 *   description: Response management
 */

/**
 * @swagger
 * /api/response/createresponse:
 *   post:
 *     summary: Create a new response
 *     tags: [Response]
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
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Response created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/createresponse", authMiddleware, isMA, createResponse);

/**
 * @swagger
 * /api/response/{id}:
 *   put:
 *     summary: Update a response
 *     tags: [Response]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The response ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postID:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Response updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authMiddleware, isMA, updateResponse);

/**
 * @swagger
 * /api/response/{id}:
 *   delete:
 *     summary: Delete a response
 *     tags: [Response]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The response ID
 *     responses:
 *       200:
 *         description: Response deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/:id", authMiddleware, isMA, deleteResponse);

/**
 * @swagger
 * /api/response/all-response:
 *   get:
 *     summary: Get all responses
 *     tags: [Response]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of responses
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
 *                   content:
 *                     type: string
 */
router.get("/all-response", authMiddleware, getAllResponse);

/**
 * @swagger
 * /api/response/{id}:
 *   get:
 *     summary: Get a response by ID
 *     tags: [Response]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The response ID
 *     responses:
 *       200:
 *         description: Response details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 postID:
 *                   type: string
 *                 content:
 *                   type: string
 */
router.get("/:id", authMiddleware, getResponse);

module.exports = router;
