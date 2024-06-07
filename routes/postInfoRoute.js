const express = require("express");
const router = express.Router();
const { isMA, authMiddleware } = require("../middlewares/authMiddleware");

const {
  createPostInfo,
  updatePostInfo,
  deletePostInfo,
  getPostInfo,
  getAllPostInfo,
} = require("../controller/postInfoCtrl");

/**
 * @swagger
 * tags:
 *   name: PostInfo
 *   description: PostInfo management
 */

/**
 * @swagger
 * /api/postinfo/createpostinfo:
 *   post:
 *     summary: Create a new post info
 *     tags: [PostInfo]
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
 *               urlPost:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Post info created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/createpostinfo", authMiddleware, isMA, createPostInfo);

/**
 * @swagger
 * /api/postinfo/{id}:
 *   put:
 *     summary: Update post info
 *     tags: [PostInfo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post info ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postID:
 *                 type: string
 *               urlPost:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Post info updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authMiddleware, isMA, updatePostInfo);

/**
 * @swagger
 * /api/postinfo/{id}:
 *   delete:
 *     summary: Delete post info
 *     tags: [PostInfo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post info ID
 *     responses:
 *       200:
 *         description: Post info deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/:id", authMiddleware, isMA, deletePostInfo);

/**
 * @swagger
 * /api/postinfo/all-postinfo:
 *   get:
 *     summary: Get all post info
 *     tags: [PostInfo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of post info
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
 *                   urlPost:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get("/all-postinfo", authMiddleware, getAllPostInfo);

/**
 * @swagger
 * /api/postinfo/{id}:
 *   get:
 *     summary: Get post info by ID
 *     tags: [PostInfo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post info ID
 *     responses:
 *       200:
 *         description: Post info details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 postID:
 *                   type: string
 *                 urlPost:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get("/:id", authMiddleware, getPostInfo);

module.exports = router;
