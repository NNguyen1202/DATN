const express = require("express");
const router = express.Router();
const {
  authMiddleware,
} = require("../middlewares/authMiddleware");

const {
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignment,
  getAllBrandAssignment,
  getAllContentAssignment,
  getAllMediaAssignment,
} = require("../controller/assignmentCtrl");

/**
 * @swagger
 * tags:
 *   name: Assignment
 *   description: Assignment management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Assignment:
 *       type: object
 *       properties:
 *         userID:
 *           type: string
 *           description: The user ID
 *         userAssignmentID:
 *           type: string
 *           description: The user assignment ID
 *         assignmentName:
 *           type: string
 *           description: The name of the assignment
 *         description:
 *           type: string
 *           description: The description of the assignment
 *         status:
 *           type: string
 *           description: The status of the assignment
 *         attachment:
 *           type: array
 *           items:
 *             type: string
 *           description: List of attachment URLs
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the assignment
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the assignment
 */

/**
 * @swagger
 * /api/assignment/brand-assistant:
 *   post:
 *     summary: Create a brand assistant assignment
 *     tags: [Assignment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Assignment'
 *     responses:
 *       200:
 *         description: Assignment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       400:
 *         description: Invalid input
 */
router.post("/brand-assistant", authMiddleware, createAssignment);

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
 *             $ref: '#/components/schemas/Assignment'
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       400:
 *         description: Invalid input
 */
router.put("/brand-assistant/:id", authMiddleware, updateAssignment);

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
router.delete("/brand-assistant/:id", authMiddleware, deleteAssignment);

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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assignment'
 */
router.get("/brand-assistant", authMiddleware, getAllBrandAssignment);

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
 *               $ref: '#/components/schemas/Assignment'
 */
router.get("/brand-assistant/:id", authMiddleware, getAssignment);

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
 *             $ref: '#/components/schemas/Assignment'
 *     responses:
 *       201:
 *         description: Assignment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       400:
 *         description: Invalid input
 */
router.post("/content-assistant", authMiddleware, createAssignment);

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
 *             $ref: '#/components/schemas/Assignment'
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       400:
 *         description: Invalid input
 */
router.put("/content-assistant/:id", authMiddleware, updateAssignment);

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
router.delete("/content-assistant/:id", authMiddleware, deleteAssignment);

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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assignment'
 */
router.get("/content-assistant", authMiddleware, getAllContentAssignment);

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
 *               $ref: '#/components/schemas/Assignment'
 */
router.get("/content-assistant/:id", authMiddleware, getAssignment);

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
 *             $ref: '#/components/schemas/Assignment'
 *     responses:
 *       201:
 *         description: Assignment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       400:
 *         description: Invalid input
 */
router.post("/media-assistant", authMiddleware, createAssignment);

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
 *             $ref: '#/components/schemas/Assignment'
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       400:
 *         description: Invalid input
 */
router.put("/media-assistant/:id", authMiddleware, updateAssignment);

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
router.delete("/media-assistant/:id", authMiddleware, deleteAssignment);

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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assignment'
 */
router.get("/media-assistant", authMiddleware, getAllMediaAssignment);

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
router.get("/media-assistant/:id", authMiddleware, getAssignment);

module.exports = router;
