import express from "express";
import {
  createAllotment,
  approveAllotment,
  getAllotments,
  removeAllotment, // <-- import the new controller
} from "../controllers/allotmentController.js";

const router = express.Router();

/**
 * @swagger
 * /api/allotments:
 *   get:
 *     summary: Get all allotments
 *     tags: [Allotments]
 *     responses:
 *       200:
 *         description: List of allotments
 */
router.get("/", getAllotments);

/**
 * @swagger
 * /api/allotments:
 *   post:
 *     summary: Create a room allotment request
 *     tags: [Allotments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: STU12345
 *               roomId:
 *                 type: string
 *                 example: RM101
 *     responses:
 *       200:
 *         description: Allotment request created
 */
router.post("/", createAllotment);

/**
 * @swagger
 * /api/allotments/{id}/approve:
 *   put:
 *     summary: Approve a room allotment
 *     tags: [Allotments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: ALT12345
 *     responses:
 *       200:
 *         description: Allotment approved
 */
router.put("/:id/approve", approveAllotment);

/**
 * @swagger
 * /api/allotments/{id}:
 *   delete:
 *     summary: Remove an allotment (student from room)
 *     tags: [Allotments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: ALT12345
 *     responses:
 *       200:
 *         description: Allotment removed successfully
 */
router.delete("/:id", removeAllotment);

export default router;