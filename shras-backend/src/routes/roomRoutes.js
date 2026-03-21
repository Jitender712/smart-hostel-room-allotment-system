import express from "express";
import {
  createRoom,
  getRooms,
  getAvailableRooms
} from "../controllers/roomController.js";

const router = express.Router();

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a new hostel room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomNumber:
 *                 type: string
 *                 example: "101"
 *               capacity:
 *                 type: integer
 *                 example: 3
 *               rentPerMonth:
 *                 type: number
 *                 example: 4500
 *               isAC:
 *                 type: boolean
 *                 example: true
 *               isAttachedWashroom:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Room created successfully
 */
router.post("/", createRoom);

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: List of all rooms
 */
router.get("/", getRooms);

/**
 * @swagger
 * /api/rooms/available:
 *   get:
 *     summary: Get all available rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: List of available rooms
 */
router.get("/available", getAvailableRooms);

export default router;