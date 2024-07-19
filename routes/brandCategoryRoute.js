// const express = require("express");
// const router = express.Router();
// const { authMiddleware } = require("../middlewares/authMiddleware");

// const {
//   createBrandCategory,
//   updateBrandCategory,
//   deleteBrandCategory,
//   getBrandCategory,
//   getAllBrandCategory,
// } = require("../controller/brandCategoryCtrl");

// /**
//  * @swagger
//  * tags:
//  *   name: Brand Categories
//  *   description: Operations related to Brand Categories
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     BrandCategory:
//  *       type: object
//  *       required:
//  *         - categoryName
//  *         - categoryDescription
//  *       properties:
//  *         categoryName:
//  *           type: string
//  *           description: The name of the brand category
//  *         categoryDescription:
//  *           type: string
//  *           description: Description of the brand category
//  *       example:
//  *         categoryName: Electronics
//  *         categoryDescription: Categories related to electronic devices
//  */

// /**
//  * @swagger
//  * /api/brandCategory/create:
//  *   post:
//  *     summary: Create a new Brand Category
//  *     tags: [Brand Categories]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/BrandCategory'
//  *     responses:
//  *       201:
//  *         description: Brand Category created successfully
//  *       400:
//  *         description: Invalid input
//  */
// router.post("/create", authMiddleware, createBrandCategory);

// /**
//  * @swagger
//  * /api/brandCategory/{id}:
//  *   put:
//  *     summary: Update a Brand Category by ID
//  *     tags: [Brand Categories]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The ID of the Brand Category to update
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/BrandCategory'
//  *     responses:
//  *       200:
//  *         description: Brand Category updated successfully
//  *       400:
//  *         description: Invalid input
//  *       404:
//  *         description: Brand Category not found
//  */
// router.put("/:id", authMiddleware, updateBrandCategory);

// /**
//  * @swagger
//  * /api/brandCategory/{id}:
//  *   delete:
//  *     summary: Delete a Brand Category by ID
//  *     tags: [Brand Categories]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The ID of the Brand Category to delete
//  *     responses:
//  *       200:
//  *         description: Brand Category deleted successfully
//  *       404:
//  *         description: Brand Category not found
//  */
// router.delete("/:id", authMiddleware, deleteBrandCategory);

// /**
//  * @swagger
//  * /api/brandCategory/allbrandcategory:
//  *   get:
//  *     summary: Get all Brand Categories
//  *     tags: [Brand Categories]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: List of all Brand Categories
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/BrandCategory'
//  */
// router.get("/allbrandcategory", authMiddleware, getAllBrandCategory);

// /**
//  * @swagger
//  * /api/brandCategory/{id}:
//  *   get:
//  *     summary: Get a Brand Category by ID
//  *     tags: [Brand Categories]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The ID of the Brand Category to retrieve
//  *     responses:
//  *       200:
//  *         description: A Brand Category object
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/BrandCategory'
//  *       404:
//  *         description: Brand Category not found
//  */
// router.get("/:id", authMiddleware, getBrandCategory);

// module.exports = router;
