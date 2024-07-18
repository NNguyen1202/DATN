const express = require('express');
const router = express.Router();
const {
    saveFacebookPosts,
    getFacebookPost,
    getFacebookPosts
} = require('../controller/facebookPostCtrl');

/**
 * @swagger
 * components:
 *   schemas:
 *     FacebookPost:
 *       type: object
 *       required:
 *         - postId
 *       properties:
 *         postId:
 *           type: string
 *           description: The unique ID of the Facebook post
 *         message:
 *           type: string
 *           description: The message content of the Facebook post
 *         createdTime:
 *           type: string
 *           format: date-time
 *           description: The creation time of the Facebook post
 *         link:
 *           type: string
 *           description: The link to the Facebook post
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
 * tags:
 *   name: FacebookPosts
 *   description: API for managing Facebook posts
 */

/**
 * @swagger
 * /api/facebookPost/save-facebook-posts:
 *   get:
 *     summary: Save new Facebook posts to MongoDB
 *     tags: [FacebookPosts]
 *     responses:
 *       '200':
 *         description: Posts saved successfully
 *       '500':
 *         description: Failed to fetch or save Facebook posts
 */
router.get('/save-facebook-posts', saveFacebookPosts);

/**
 * @swagger
 * /api/facebookPost/all-facebook-posts:
 *   get:
 *     summary: Retrieve all Facebook posts from MongoDB
 *     tags: [FacebookPosts]
 *     responses:
 *       '200':
 *         description: A list of Facebook posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FacebookPost'
 */
router.get('/all-facebook-posts', getFacebookPosts);

/**
 * @swagger
 * /api/facebookPost/{id}:
 *   get:
 *     summary: Retrieve a Facebook post by ID from MongoDB
 *     tags: [FacebookPosts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Facebook post to retrieve
 *     responses:
 *       '200':
 *         description: A Facebook post object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FacebookPost'
 *       '404':
 *         description: Facebook post not found
 */
router.get('/:id', getFacebookPost);

module.exports = router;
