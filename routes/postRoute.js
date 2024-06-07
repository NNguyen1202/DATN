const express = require("express");
const router = express.Router();
const { isMA, authMiddleware } = require("../middlewares/authMiddleware");

const {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPost,
} = require("../controller/postCtrl");

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Post management
 */

/**
 * @swagger
 * /api/post/createpost:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               videoID:
 *                 type: string
 *               scriptID:
 *                 type: string
 *               mediaChannel:
 *                 type: string
 *               postDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/createpost", authMiddleware, isMA, createPost);

/**
 * @swagger
 * /api/post/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               videoID:
 *                 type: string
 *               scriptID:
 *                 type: string
 *               mediaChannel:
 *                 type: string
 *               postDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authMiddleware, isMA, updatePost);

/**
 * @swagger
 * /api/post/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/:id", authMiddleware, isMA, deletePost);

/**
 * @swagger
 * /api/post/all-post:
 *   get:
 *     summary: Get all posts
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   videoID:
 *                     type: string
 *                   scriptID:
 *                     type: string
 *                   mediaChannel:
 *                     type: string
 *                   postDate:
 *                     type: string
 *                     format: date
 *                   status:
 *                     type: string
 */
router.get("/all-post", authMiddleware, getAllPost);

/**
 * @swagger
 * /api/post/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Post details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 videoID:
 *                   type: string
 *                 scriptID:
 *                   type: string
 *                 mediaChannel:
 *                   type: string
 *                 postDate:
 *                   type: string
 *                   format: date
 *                 status:
 *                   type: string
 */
router.get("/:id", authMiddleware, getPost);

module.exports = router;
