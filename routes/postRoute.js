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
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - content
 *         - postUploadUrl
 *         - mediaChannel
 *         - postDate
 *         - status
 *       properties:
 *         videoID:
 *           type: string
 *           description: The ID of the related video
 *         brandID:
 *           type: string
 *           description: The ID of the related brand
 *         productID:
 *           type: array
 *           items:
 *             type: string
 *           description: List of IDs of related products
 *         assignmentID:
 *           type: string
 *           description: The ID of the related assignment
 *         title:
 *           type: string
 *           description: The title of the post
 *         description:
 *           type: string
 *           description: The description of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         postUploadUrl:
 *           type: string
 *           description: The URL where the post is uploaded
 *         facebookPostUrl:
 *           type: string
 *           description: The URL where the post is uploaded
 *         mediaChannel:
 *           type: string
 *           description: The media channel of the post
 *         postDate:
 *           type: string
 *           format: date
 *           description: The date of the post
 *         status:
 *           type: string
 *           description: The status of the post
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the post
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the post
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
 *             $ref: '#/components/schemas/Post'
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
 *             $ref: '#/components/schemas/Post'
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
 *                 $ref: '#/components/schemas/Post'
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
 *               $ref: '#/components/schemas/Post'
 */
router.get("/:id", authMiddleware, getPost);

module.exports = router;
