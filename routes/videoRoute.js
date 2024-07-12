const express = require("express");
const router = express.Router();
const { isMA, authMiddleware } = require("../middlewares/authMiddleware");

const {
  createVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  getAllVideo,
} = require("../controller/videoCtrl");

/**
 * @swagger
 * tags:
 *   name: Video
 *   description: Video management
 */

/**
 * @swagger
 * /api/video:
 *   post:
 *     summary: Create a new video
 *     tags: [Video]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assignmentID:
 *                 type: string
 *               contractID:
 *                 type: string
 *               taskID:
 *                 type: string
 *               scriptID:
 *                 type: string
 *               title:
 *                 type: string
 *                 required: true
 *               thumbnailUrl:
 *                 type: array
 *                 items:
 *                   type: string
 *               draftVersionUrl:
 *                 type: array
 *                 items:
 *                   type: string
 *               finalVersionUrl:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *         description: Video created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", authMiddleware, isMA, createVideo);

/**
 * @swagger
 * /api/video/{id}:
 *   put:
 *     summary: Update a video
 *     tags: [Video]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The video ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assignmentID:
 *                 type: string
 *               contractID:
 *                 type: string
 *               taskID:
 *                 type: string
 *               scriptID:
 *                 type: string
 *               title:
 *                 type: string
 *                 required: true
 *               thumbnailUrl:
 *                 type: array
 *                 items:
 *                   type: string
 *               draftVersionUrl:
 *                 type: array
 *                 items:
 *                   type: string
 *               finalVersionUrl:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Video updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authMiddleware, isMA, updateVideo);

/**
 * @swagger
 * /api/video/{id}:
 *   delete:
 *     summary: Delete a video
 *     tags: [Video]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The video ID
 *     responses:
 *       200:
 *         description: Video deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/:id", authMiddleware, isMA, deleteVideo);

/**
 * @swagger
 * /api/video:
 *   get:
 *     summary: Get all videos
 *     tags: [Video]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of videos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   assignmentID:
 *                     type: string
 *                   contractID:
 *                     type: string
 *                   taskID:
 *                     type: string
 *                   scriptID:
 *                     type: string
 *                   title:
 *                     type: string
 *                   thumbnailUrl:
 *                     type: array
 *                     items:
 *                       type: string
 *                   draftVersionUrl:
 *                     type: array
 *                     items:
 *                       type: string
 *                   finalVersionUrl:
 *                     type: array
 *                     items:
 *                       type: string
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 */
router.get("/", authMiddleware, getAllVideo);

/**
 * @swagger
 * /api/video/{id}:
 *   get:
 *     summary: Get a video by ID
 *     tags: [Video]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The video ID
 *     responses:
 *       200:
 *         description: Video details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 assignmentID:
 *                   type: string
 *                 contractID:
 *                   type: string
 *                 taskID:
 *                   type: string
 *                 scriptID:
 *                   type: string
 *                 title:
 *                   type: string
 *                 thumbnailUrl:
 *                   type: array
 *                   items:
 *                     type: string
 *                 draftVersionUrl:
 *                   type: array
 *                   items:
 *                     type: string
 *                 finalVersionUrl:
 *                   type: array
 *                   items:
 *                     type: string
 *                 status:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 */
router.get("/:id", authMiddleware, getVideo);

module.exports = router;
