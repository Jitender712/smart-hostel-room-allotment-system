import express from "express";
import {
  createAdmin,
  adminLogin,
  getAdmins,
} from "../controllers/adminController.js";

const router = express.Router();

/**
 * @swagger
 * /api/admins/create:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               contactNumber:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: Admin created successfully
 */
router.post("/create", createAdmin);

/**
 * @swagger
 * /api/admins/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful and JWT token returned
 */
router.post("/login", adminLogin);

/**
 * @swagger
 * /api/admins:
 *   get:
 *     summary: Get all admins
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: List of admins
 */
router.get("/", getAdmins);

export default router;