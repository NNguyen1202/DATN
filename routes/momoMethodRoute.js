const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  createMomoMethod,
  updateMomoMethod,
  deleteMomoMethod,
  getMomoMethod,
  getAllMomoMethod,
} = require("../controller/momoMethodCtrl");

/**
 * @swagger
 * components:
 *   schemas:
 *     MomoMethod:
 *       type: object
 *       required:
 *         - momoPhoneNumber
 *         - momoName
 *         - momoMoney
 *       properties:
 *         momoPhoneNumber:
 *           type: string
 *           description: The phone number associated with the Momo account
 *         momoName:
 *           type: string
 *           description: The name associated with the Momo account
 *         momoMoney:
 *           type: string
 *           description: The amount of money in the Momo account
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date
 */

/**
 * @swagger
 * tags:
 *   name: MomoMethods
 *   description: API for managing Momo methods
 */

/**
 * @swagger
 * /api/momoMethod/create:
 *   post:
 *     summary: Create a new Momo method
 *     tags: [MomoMethods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MomoMethod'
 *     responses:
 *       200:
 *         description: The created Momo method
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MomoMethod'
 *       500:
 *         description: Server error
 */
router.post("/create", authMiddleware, createMomoMethod);

/**
 * @swagger
 * /api/momoMethod/{id}:
 *   put:
 *     summary: Update a Momo method
 *     tags: [MomoMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Momo method ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MomoMethod'
 *     responses:
 *       200:
 *         description: The updated Momo method
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MomoMethod'
 *       404:
 *         description: Momo method not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleware, updateMomoMethod);

/**
 * @swagger
 * /api/momoMethod/{id}:
 *   delete:
 *     summary: Delete a Momo method
 *     tags: [MomoMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Momo method ID
 *     responses:
 *       200:
 *         description: The deleted Momo method
 *       404:
 *         description: Momo method not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", authMiddleware, deleteMomoMethod);

/**
 * @swagger
 * /api/momoMethod/allmomomethod:
 *   get:
 *     summary: Get all Momo methods
 *     tags: [MomoMethods]
 *     responses:
 *       200:
 *         description: List of all Momo methods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MomoMethod'
 *       500:
 *         description: Server error
 */
router.get("/allmomomethod", authMiddleware, getAllMomoMethod);

/**
 * @swagger
 * /api/momoMethod/{id}:
 *   get:
 *     summary: Get a Momo method by ID
 *     tags: [MomoMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Momo method ID
 *     responses:
 *       200:
 *         description: The requested Momo method
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MomoMethod'
 *       404:
 *         description: Momo method not found
 *       500:
 *         description: Server error
 */
router.get("/:id", authMiddleware, getMomoMethod);

module.exports = router;
