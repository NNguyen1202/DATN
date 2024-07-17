const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  getPaymentMethod,
  getAllPaymentMethod,
} = require("../controller/paymentMethodCtrl");

/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentMethod:
 *       type: object
 *       required:
 *         - methodName
 *       properties:
 *         methodName:
 *           type: string
 *           description: The name of the payment method
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
 *   name: PaymentMethods
 *   description: API for managing payment methods
 */

/**
 * @swagger
 * /api/paymentMethod/create:
 *   post:
 *     summary: Create a new payment method
 *     tags: [PaymentMethods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentMethod'
 *     responses:
 *       200:
 *         description: The created payment method
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentMethod'
 *       500:
 *         description: Server error
 */
router.post("/create", authMiddleware, createPaymentMethod);

/**
 * @swagger
 * /api/paymentMethod/{id}:
 *   put:
 *     summary: Update a payment method
 *     tags: [PaymentMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment method ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentMethod'
 *     responses:
 *       200:
 *         description: The updated payment method
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentMethod'
 *       404:
 *         description: Payment method not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleware, updatePaymentMethod);

/**
 * @swagger
 * /api/paymentMethod/{id}:
 *   delete:
 *     summary: Delete a payment method
 *     tags: [PaymentMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment method ID
 *     responses:
 *       200:
 *         description: The deleted payment method
 *       404:
 *         description: Payment method not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", authMiddleware, deletePaymentMethod);

/**
 * @swagger
 * /api/paymentMethod/allpaymentmethod:
 *   get:
 *     summary: Get all payment methods
 *     tags: [PaymentMethods]
 *     responses:
 *       200:
 *         description: List of all payment methods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PaymentMethod'
 *       500:
 *         description: Server error
 */
router.get("/allpaymentmethod", authMiddleware, getAllPaymentMethod);

/**
 * @swagger
 * /api/paymentMethod/{id}:
 *   get:
 *     summary: Get a payment method by ID
 *     tags: [PaymentMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment method ID
 *     responses:
 *       200:
 *         description: The requested payment method
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentMethod'
 *       404:
 *         description: Payment method not found
 *       500:
 *         description: Server error
 */
router.get("/:id", authMiddleware, getPaymentMethod);

module.exports = router;
