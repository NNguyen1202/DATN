const express = require('express');
const router = express.Router();
const {
  saveFacebookPostStats,
  getFacebookPostStatsDetail,
  getFacebookPostStats,
} = require('../controller/facebookPostStatsCtrl');

/**
 * @swagger
 * tags:
 *   name: FacebookPostStats
 *   description: APIs for managing Facebook post statistics
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FacebookPostStats:
 *       type: object
 *       required:
 *         - postId
 *       properties:
 *         postId:
 *           type: string
 *           description: The unique ID of the Facebook post
 *         totalComments:
 *           type: integer
 *           description: Total number of comments on the post
 *         totalLikes:
 *           type: integer
 *           description: Total number of likes on the post
 *         totalShares:
 *           type: integer
 *           description: Total number of shares of the post
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the record
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the record
 */

/**
 * @swagger
 * /api/facebookPostStat/save-facebook-post-stats:
 *   get:
 *     summary: Retrieve and save Facebook post statistics
 *     tags: [FacebookPostStats]
 *     responses:
 *       '200':
 *         description: Post statistics saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *       '404':
 *         description: No posts found on Facebook
 *       '500':
 *         description: Failed to fetch or save Facebook post statistics
 */
router.get('/save-facebook-post-stats', saveFacebookPostStats);

/**
 * @swagger
 * /api/facebookPostStat/all-facebook-post-stats:
 *   get:
 *     summary: Retrieve all Facebook post statistics
 *     tags: [FacebookPostStats]
 *     responses:
 *       '200':
 *         description: A list of Facebook post statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FacebookPostStats'
 *       '500':
 *         description: Failed to fetch Facebook post statistics
 */
router.get('/all-facebook-post-stats', getFacebookPostStats);

/**
 * @swagger
 * /api/facebookPostStat/{id}:
 *   get:
 *     summary: Retrieve Facebook post statistics by ID
 *     tags: [FacebookPostStats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Facebook post statistics to retrieve
 *     responses:
 *       '200':
 *         description: Facebook post statistics object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FacebookPostStats'
 *       '500':
 *         description: Failed to fetch Facebook post statistics detail
 */
router.get('/:id', getFacebookPostStatsDetail);

module.exports = router;
