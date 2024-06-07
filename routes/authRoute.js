const express = require("express");

const {
  createUser,
  loginUserCtrl,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  getAllBrandUser,
  getAllContentUser,
  getAllMediaUser,
} = require("../controller/userCtrl");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               fullName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               roleID:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/register", createUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginUserCtrl);

/**
 * @swagger
 * /api/user/all-users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               fullName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               roleID:
 *                 type: string
 */
router.get("/all-users", getAllUser);

/**
 * @swagger
 * /api/user/all-brand-users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               fullName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               roleID:
 *                 type: string
 */
router.get("/all-brand-users", getAllBrandUser);

/**
 * @swagger
 * /api/user/all-content-users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               fullName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               roleID:
 *                 type: string
 */
router.get("/all-content-users", getAllContentUser);

/**
 * @swagger
 * /api/user/all-media-users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               fullName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               roleID:
 *                 type: string
 */
router.get("/all-media-users", getAllMediaUser);

/**
 * @swagger
 * /api/user/refresh:
 *   get:
 *     summary: Refresh user token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 */
router.get("/refresh", handleRefreshToken);

/**
 * @swagger
 * /api/user/logout:
 *   get:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.get("/logout", logout);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user information
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               fullName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               roleID:
 *                 type: string
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authMiddleware, isAdmin, getUser);

/**
 * @swagger
 * /api/user/edit-user/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               roleID:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/edit-user/:id", authMiddleware, updateUser);

/**
 * @swagger
 * /api/user/block-user/{id}:
 *   put:
 *     summary: Block a user
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User blocked successfully
 */
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);

/**
 * @swagger
 * /api/user/unblock-user/{id}:
 *   put:
 *     summary: Unblock a user
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User unblocked successfully
 */
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete("/:id", deleteUser);

module.exports = router;
