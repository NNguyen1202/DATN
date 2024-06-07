const express = require("express");
const {
  createContract,
  updateContract,
  deleteContract,
  getContract,
  getAllContract,
  uploadFilePdf,
} = require("../controller/contractCtrl");
const router = express.Router();
const upload = require("../middlewares/uploadPdfMiddleware");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Contract
 *   description: Contract management
 */

/**
 * @swagger
 * /api/contract/createcontract:
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
 *             type: object
 *             properties:
 *               brandID:
 *                 type: string
 *               userID:
 *                 type: string
 *               title:
 *                 type: string
 *               minViews:
 *                 type: number
 *               minLikes:
 *                 type: number
 *               minShares:
 *                 type: number
 *               minComments:
 *                 type: number
 *               urlUpload:
 *                 type: array
 *                 items:
 *                   type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate1:
 *                 type: string
 *                 format: date
 *               endDate2:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contract created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/createcontract", authMiddleware, createContract);

/**
 * @swagger
 * /api/contract/{id}:
 *   put:
 *     summary: Update a contract
 *     tags: [Contract]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contract ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandID:
 *                 type: string
 *               userID:
 *                 type: string
 *               title:
 *                 type: string
 *               minViews:
 *                 type: number
 *               minLikes:
 *                 type: number
 *               minShares:
 *                 type: number
 *               minComments:
 *                 type: number
 *               urlUpload:
 *                 type: array
 *                 items:
 *                   type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate1:
 *                 type: string
 *                 format: date
 *               endDate2:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contract updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authMiddleware, updateContract);

/**
 * @swagger
 * /api/contract/{id}:
 *   delete:
 *     summary: Delete a contract
 *     tags: [Contract]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contract ID
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
 *                 type: object
 *                 properties:
 *               brandID:
 *                 type: string
 *               userID:
 *                 type: string
 *               title:
 *                 type: string
 *               minViews:
 *                 type: number
 *               minLikes:
 *                 type: number
 *               minShares:
 *                 type: number
 *               minComments:
 *                 type: number
 *               urlUpload:
 *                 type: array
 *                 items:
 *                   type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate1:
 *                 type: string
 *                 format: date
 *               endDate2:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
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
 *         description: The contract ID
 *     responses:
 *       200:
 *         description: Contract details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *               brandID:
 *                 type: string
 *               userID:
 *                 type: string
 *               title:
 *                 type: string
 *               minViews:
 *                 type: number
 *               minLikes:
 *                 type: number
 *               minShares:
 *                 type: number
 *               minComments:
 *                 type: number
 *               urlUpload:
 *                 type: array
 *                 items:
 *                   type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate1:
 *                 type: string
 *                 format: date
 *               endDate2:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 */
router.get("/:id", authMiddleware, getContract);

/**
 * @swagger
 * /api/contract/{id}/upload:
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
 *         description: The contract ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               brandID:
 *                 type: string
 *               userID:
 *                 type: string
 *               title:
 *                 type: string
 *               minViews:
 *                 type: number
 *               minLikes:
 *                 type: number
 *               minShares:
 *                 type: number
 *               minComments:
 *                 type: number
 *               urlUpload:
 *                 type: array
 *                 items:
 *                   type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate1:
 *                 type: string
 *                 format: date
 *               endDate2:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/:id/upload",
  authMiddleware,
  upload.single("pdf"),
  uploadFilePdf
);

module.exports = router;
