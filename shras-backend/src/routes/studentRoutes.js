import express from "express";
import {
  registerStudent,
  getStudents,
  getStudentById,
  deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

/**
 * @swagger
 * /api/students/register:
 *   post:
 *     summary: Register a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Rahul
 *               lastName:
 *                 type: string
 *                 example: Sharma
 *               email:
 *                 type: string
 *                 example: rahul@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *               course:
 *                 type: string
 *                 example: B.Tech
 *               yearOfStudy:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Student registered successfully
 */
router.post("/register", registerStudent);

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 */
router.get("/", getStudents);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: STU12345
 *     responses:
 *       200:
 *         description: Student details
 */
router.get("/:id", getStudentById);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: STU12345
 *     responses:
 *       200:
 *         description: Student deleted successfully
 */
router.delete("/:id", deleteStudent);

export default router;