const express = require("express");
const router = express.Router();
const { isCA, authMiddleware } = require("../middlewares/authMiddleware");

const {
  createScript,
  updateScript,
  deleteScript,
  getScript,
  getAllScript,
} = require("../controller/scriptCtrl");

/**
 * @swagger
 * tags:
 *   name: Script
 *   description: Script management
 */

/**
 * @swagger
 * /api/script/createscript:
 *   post:
 *     summary: Create a new script
 *     tags: [Script]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskID:
 *                 type: string
 *               title:
 *                 type: string
 *               timeline:
 *                 type: string
 *               background:
 *                 type: string
 *               cameraAngle:
 *                 type: string
 *               content:
 *                 type: string
 *               contentImgUrl:
 *                 type: string
 *               version:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Script created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/createscript", authMiddleware, isCA, createScript);

/**
 * @swagger
 * /api/script/{id}:
 *   put:
 *     summary: Update a script
 *     tags: [Script]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The script ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskID:
 *                 type: string
 *               title:
 *                 type: string
 *               timeline:
 *                 type: string
 *               background:
 *                 type: string
 *               cameraAngle:
 *                 type: string
 *               content:
 *                 type: string
 *               contentImgUrl:
 *                 type: string
 *               version:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Script updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authMiddleware, isCA, updateScript);

/**
 * @swagger
 * /api/script/{id}:
 *   delete:
 *     summary: Delete a script
 *     tags: [Script]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The script ID
 *     responses:
 *       200:
 *         description: Script deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/:id", authMiddleware, isCA, deleteScript);

/**
 * @swagger
 * /api/script/all-script:
 *   get:
 *     summary: Get all scripts
 *     tags: [Script]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of scripts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   taskID:
 *                     type: string
 *                   title:
 *                     type: string
 *                   timeline:
 *                     type: string
 *                   background:
 *                     type: string
 *                   cameraAngle:
 *                     type: string
 *                   content:
 *                     type: string
 *                   contentImgUrl:
 *                     type: string
 *                   version:
 *                     type: string
 *                   status:
 *                     type: string
 */
router.get("/all-script", authMiddleware, getAllScript);

/**
 * @swagger
 * /api/script/{id}:
 *   get:
 *     summary: Get a script by ID
 *     tags: [Script]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The script ID
 *     responses:
 *       200:
 *         description: Script details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 taskID:
 *                   type: string
 *                 title:
 *                   type: string
 *                 timeline:
 *                   type: string
 *                 background:
 *                   type: string
 *                 cameraAngle:
 *                   type: string
 *                 content:
 *                   type: string
 *                 contentImgUrl:
 *                   type: string
 *                 version:
 *                   type: string
 *                 status:
 *                   type: string
 */
router.get("/:id", authMiddleware, getScript);

module.exports = router;
