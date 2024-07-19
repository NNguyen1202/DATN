const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { authMiddleware } = require("../middlewares/authMiddleware");
const PaymentTerm = require("../models/paymentTermModel");
const validateMongoDbId = require("../utils/validateMongodbId");

const {
  createPaymentTerm,
  updatePaymentTerm,
  deletePaymentTerm,
  getPaymentTerm,
  getAllPaymentTerm,
} = require("../controller/paymentTermCtrl");

/**
 * @swagger
 * tags:
 *   name: PaymentTerm
 *   description: PaymentTerm management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentTerm:
 *       type: object
 *       properties:
 *         termID:
 *           type: string
 *           description: The ID of the term associated with the payment term
 *         minstonePaid:
 *           type: string
 *           description: Amount paid in minestone
 *         datePaid:
 *           type: string
 *           format: date-time
 *           description: Date of payment
 *         status:
 *           type: string
 *           description: Status of the payment term
 */

/**
 * @swagger
 * /api/paymentterm:
 *   post:
 *     summary: Create a new payment term
 *     tags: [PaymentTerm]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentTerm'
 *     responses:
 *       200:
 *         description: Payment term created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", authMiddleware, createPaymentTerm);

/**
 * @swagger
 * /api/paymentterm/{id}:
 *   put:
 *     summary: Update a payment term by ID
 *     tags: [PaymentTerm]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the payment term to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentTerm'
 *     responses:
 *       200:
 *         description: Payment term updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authMiddleware, updatePaymentTerm);

/**
 * @swagger
 * /api/paymentterm/{id}:
 *   delete:
 *     summary: Delete a payment term by ID
 *     tags: [PaymentTerm]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the payment term to delete
 *     responses:
 *       200:
 *         description: Payment term deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/:id", authMiddleware, deletePaymentTerm);

/**
 * @swagger
 * /api/paymentterm/allpaymentterm:
 *   get:
 *     summary: Get all payment terms
 *     tags: [PaymentTerm]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payment terms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PaymentTerm'
 */
router.get("/allpaymentterm", authMiddleware, getAllPaymentTerm);

/**
 * @swagger
 * /api/paymentterm/{id}:
 *   get:
 *     summary: Get a payment term by ID
 *     tags: [PaymentTerm]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the payment term to retrieve
 *     responses:
 *       200:
 *         description: Payment term details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentTerm'
 */
router.get("/:id", authMiddleware, getPaymentTerm);

module.exports = router;

