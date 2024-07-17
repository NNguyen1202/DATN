const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  createBankingMethod,
  updateBankingMethod,
  deleteBankingMethod,
  getBankingMethod,
  getAllBankingMethod,
} = require("../controller/bankingMethodCtrl");

/**
 * @swagger
 * components:
 *   schemas:
 *     BankingMethod:
 *       type: object
 *       required:
 *         - bankName
 *         - bankAccount
 *         - bankAccountName
 *         - bankMoney
 *       properties:
 *         bankName:
 *           type: string
 *           description: The name of the bank
 *         bankAccount:
 *           type: string
 *           description: The bank account number
 *         bankAccountName:
 *           type: string
 *           description: The name of the bank account holder
 *         bankMoney:
 *           type: string
 *           description: The amount of money in the bank account
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
 *   name: BankingMethods
 *   description: API for managing banking methods
 */

/**
 * @swagger
 * /api/bankingMethod/create:
 *   post:
 *     summary: Create a new banking method
 *     tags: [BankingMethods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BankingMethod'
 *     responses:
 *       200:
 *         description: The created banking method
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BankingMethod'
 *       500:
 *         description: Server error
 */
router.post("/create", authMiddleware, createBankingMethod);

/**
 * @swagger
 * /api/bankingMethod/{id}:
 *   put:
 *     summary: Update a banking method
 *     tags: [BankingMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The banking method ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BankingMethod'
 *     responses:
 *       200:
 *         description: The updated banking method
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BankingMethod'
 *       404:
 *         description: Banking method not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleware, updateBankingMethod);

/**
 * @swagger
 * /api/bankingMethod/{id}:
 *   delete:
 *     summary: Delete a banking method
 *     tags: [BankingMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The banking method ID
 *     responses:
 *       200:
 *         description: The deleted banking method
 *       404:
 *         description: Banking method not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", authMiddleware, deleteBankingMethod);

/**
 * @swagger
 * /api/bankingMethod/allbankingmethod:
 *   get:
 *     summary: Get all banking methods
 *     tags: [BankingMethods]
 *     responses:
 *       200:
 *         description: List of all banking methods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BankingMethod'
 *       500:
 *         description: Server error
 */
router.get("/allbankingmethod", authMiddleware, getAllBankingMethod);

/**
 * @swagger
 * /api/bankingMethod/{id}:
 *   get:
 *     summary: Get a banking method by ID
 *     tags: [BankingMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The banking method ID
 *     responses:
 *       200:
 *         description: The requested banking method
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BankingMethod'
 *       404:
 *         description: Banking method not found
 *       500:
 *         description: Server error
 */
router.get("/:id", authMiddleware, getBankingMethod);

module.exports = router;
