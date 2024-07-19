const express = require("express");
const router = express.Router();
const {
  authMiddleware,
} = require("../middlewares/authMiddleware");
const {
  createContract,
  updateContract,
  deleteContract,
  getContract,
  getAllContract,
  uploadFilePdf,
} = require("../controller/contractCtrl");

/**
 * @swagger
 * tags:
 *   name: Contract
 *   description: Contract management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Contract:
 *       type: object
 *       properties:
 *         brandID:
 *           type: string
 *           description: The ID of the brand associated with the contract
 *         userID:
 *           type: string
 *           description: The ID of the user associated with the contract
 *         termID:
 *           type: string
 *           description: The ID of the term associated with the contract
 *         title:
 *           type: string
 *           description: The title of the contract
 *         service:
 *           type: string
 *           description: The service provided in the contract
 *         minLikes:
 *           type: number
 *           description: The minimum number of likes required
 *         minShares:
 *           type: number
 *           description: The minimum number of shares required
 *         minComments:
 *           type: number
 *           description: The minimum number of comments required
 *         urlUpload:
 *           type: string
 *           description: The URL of the uploaded file (PDF)
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date of the contract
 *         endDate1:
 *           type: string
 *           format: date-time
 *           description: The first end date of the contract
 *         endDate2:
 *           type: string
 *           format: date-time
 *           description: The second end date of the contract
 *         status:
 *           type: string
 *           description: The status of the contract
 */

/**
 * @swagger
 * /api/contract:
 *   post:
 *     summary: Create a new contract
 *     tags: [Contract]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contract'
 *     responses:
 *       200:
 *         description: Contract created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contract'
 *       400:
 *         description: Invalid input
 */
router.post("/", authMiddleware, createContract);

/**
 * @swagger
 * /api/contract/{id}:
 *   put:
 *     summary: Update a contract by ID
 *     tags: [Contract]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the contract to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contract'
 *     responses:
 *       200:
 *         description: Contract updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contract'
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authMiddleware, updateContract);

/**
 * @swagger
 * /api/contract/{id}:
 *   delete:
 *     summary: Delete a contract by ID
 *     tags: [Contract]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the contract to delete
 *     responses:
 *       200:
 *         description: Contract deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/:id", authMiddleware, deleteContract);

/**
 * @swagger
 * /api/contract/allcontracts:
 *   get:
 *     summary: Get all contracts
 *     tags: [Contract]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contracts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contract'
 */
router.get("/allcontracts", authMiddleware, getAllContract);

/**
 * @swagger
 * /api/contract/{id}:
 *   get:
 *     summary: Get a contract by ID
 *     tags: [Contract]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the contract to retrieve
 *     responses:
 *       200:
 *         description: Contract details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contract'
 */
router.get("/:id", authMiddleware, getContract);

/**
 * @swagger
 * /api/contract/upload-pdf/{id}:
 *   post:
 *     summary: Upload a PDF file for a contract
 *     tags: [Contract]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the contract to upload the PDF file for
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 filePath:
 *                   type: string
 *                   description: URL path of the uploaded file
 *       400:
 *         description: No file uploaded or other errors
 */
router.post("/upload-pdf/:id", authMiddleware, uploadFilePdf);

module.exports = router;
