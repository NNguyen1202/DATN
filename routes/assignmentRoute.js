const express = require("express");
const router = express.Router();
const {
  isBA,
  isCA,
  isMA,
  authMiddleware,
} = require("../middlewares/authMiddleware");

const {
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignment,
  getallAssignment,
} = require("../controller/assignmentCtrl");

/**
 * @swagger
 * tags:
 *   name: Assignment
 *   description: Assignment management
 */

/**
 * @swagger
 * /api/assignment/brand-assistant:
 *   post:
 *     summary: Create a brand assistant assignment
 *     tags: [Assignment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *       400:
 *         description: Invalid input
 */

router.post("/brand-assistant", authMiddleware, isBA, createAssignment);

/**
 * @swagger
 * /api/assignment/brand-assistant/{id}:
 *   put:
 *     summary: Update a brand assistant assignment
 *     tags: [Assignment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/brand-assistant/:id", authMiddleware, isBA, updateAssignment);

/**
 * @swagger
 * /api/assignment/brand-assistant/{id}:
 *   delete:
 *     summary: Delete a brand assistant assignment
 *     tags: [Assignment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The assignment ID
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/brand-assistant/:id", authMiddleware, isBA, deleteAssignment);

/**
 * @swagger
 * /api/assignment/brand-assistant:
 *   get:
 *     summary: Get all brand assistant assignments
 *     tags: [Assignment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of assignments
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 */
router.get("/brand-assistant", authMiddleware, isBA, getallAssignment);

/**
 * @swagger
 * /api/assignment/brand-assistant/{id}:
 *   get:
 *     summary: Get a brand assistant assignment by ID
 *     tags: [Assignment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The assignment ID
 *     responses:
 *       200:
 *         description: Assignment details
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 */
router.get("/brand-assistant/:id", authMiddleware, isBA, getAssignment);

/**
 * @swagger
 * /api/assignment/content-assistant:
 *   post:
 *     summary: Create a new content assistant assignment
 *     tags: [Assignment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Assignment created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/content-assistant", authMiddleware, isCA, createAssignment);

/**
 * @swagger
 * /api/assignment/content-assistant/{id}:
 *   put:
 *     summary: Update a content assistant assignment
 *     tags: [Assignment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/content-assistant/:id", authMiddleware, isCA, updateAssignment);

/**
 * @swagger
 * /api/assignment/content-assistant/{id}:
 *   delete:
 *     summary: Delete a content assistant assignment
 *     tags: [Assignment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The assignment ID
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/content-assistant/:id", authMiddleware, isCA, deleteAssignment);

/**
 * @swagger
 * /api/assignment/content-assistant:
 *   get:
 *     summary: Get all content assistant assignments
 *     tags: [Assignment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of assignments
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 */
router.get("/content-assistant", authMiddleware, isCA, getallAssignment);

/**
 * @swagger
 * /api/assignment/content-assistant/{id}:
 *   get:
 *     summary: Get a content assistant assignment by ID
 *     tags: [Assignment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The assignment ID
 *     responses:
 *       200:
 *         description: Assignment details
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 */
router.get("/content-assistant/:id", authMiddleware, isCA, getAssignment);

/**
 * @swagger
 * /api/assignment/media-assistant:
 *   post:
 *     summary: Create a new media assistant assignment
 *     tags: [Assignment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Assignment created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/media-assistant", authMiddleware, isMA, createAssignment);

/**
 * @swagger
 * /api/assignment/media-assistant/{id}:
 *   put:
 *     summary: Update a media assistant assignment
 *     tags: [Assignment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/media-assistant/:id", authMiddleware, isMA, updateAssignment);

/**
 * @swagger
 * /api/assignment/media-assistant/{id}:
 *   delete:
 *     summary: Delete a media assistant assignment
 *     tags: [Assignment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The assignment ID
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/media-assistant/:id", authMiddleware, isMA, deleteAssignment);

/**
 * @swagger
 * /api/assignment/media-assistant:
 *   get:
 *     summary: Get all media assistant assignments
 *     tags: [Assignment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of assignments
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 */
router.get("/media-assistant", authMiddleware, isMA, getallAssignment);

/**
 * @swagger
 * /api/assignment/media-assistant/{id}:
 *   get:
 *     summary: Get a media assistant assignment by ID
 *     tags: [Assignment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The assignment ID
 *     responses:
 *       200:
 *         description: Assignment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 */
router.get("/media-assistant/:id", authMiddleware, isMA, getAssignment);

module.exports = router;
