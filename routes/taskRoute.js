const express = require("express");
const router = express.Router();
const { isCA, authMiddleware } = require("../middlewares/authMiddleware");

const {
  createTask,
  updateTask,
  deleteTask,
  getTask,
  getAllTask,
} = require("../controller/taskCtrl");

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: Task management
 */

/**
 * @swagger
 * /api/task/createtask:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
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
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               timeline:
 *                 type: string
 *               background:
 *                 type: string
 *               cameraAngle:
 *                 type: string
 *               equipment:
 *                 type: string
 *               wardrobe:
 *                 type: string
 *               postProductDetail:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/createtask", authMiddleware, isCA, createTask);

/**
 * @swagger
 * /api/task/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
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
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               timeline:
 *                 type: string
 *               background:
 *                 type: string
 *               cameraAngle:
 *                 type: string
 *               equipment:
 *                 type: string
 *               wardrobe:
 *                 type: string
 *               postProductDetail:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authMiddleware, isCA, updateTask);

/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/:id", authMiddleware, isCA, deleteTask);

/**
 * @swagger
 * /api/task/all-task:
 *   get:
 *     summary: Get all tasks
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
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
 *                   description:
 *                     type: string
 *                   location:
 *                     type: string
 *                   timeline:
 *                     type: string
 *                   background:
 *                     type: string
 *                   cameraAngle:
 *                     type: string
 *                   equipment:
 *                     type: string
 *                   wardrobe:
 *                     type: string
 *                   postProductDetail:
 *                     type: string
 *                   status:
 *                     type: string
 */
router.get("/all-task", authMiddleware, getAllTask);

/**
 * @swagger
 * /api/task/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task details
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
 *                 description:
 *                   type: string
 *                 location:
 *                   type: string
 *                 timeline:
 *                   type: string
 *                 background:
 *                   type: string
 *                 cameraAngle:
 *                   type: string
 *                 equipment:
 *                   type: string
 *                 wardrobe:
 *                   type: string
 *                 postProductDetail:
 *                   type: string
 *                 status:
 *                   type: string
 */
router.get("/:id", authMiddleware, getTask);

module.exports = router;
