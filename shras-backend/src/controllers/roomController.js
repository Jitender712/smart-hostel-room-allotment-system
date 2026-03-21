import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const createRoom = (req, res) => {
  const { roomNumber, capacity, rentPerMonth, isAC, isAttachedWashroom, status } = req.body;

  // Generate RoomID (varchar 20)
  const roomID = uuidv4().slice(0, 20);

  // Default status to 'Available' if not provided
  const roomStatus = status || "Available";

  const sql = `
    INSERT INTO Rooms 
      (RoomID, RoomNumber, Capacity, CurrentOccupancy, RentPerMonth, IsAC, IsAttachedWashroom, Status)
    VALUES (?, ?, ?, 0, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [roomID, roomNumber, capacity, rentPerMonth, isAC, isAttachedWashroom, roomStatus],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Room created successfully", roomID });
    }
  );
};

export const getRooms = (req, res) => {
  db.query("SELECT * FROM Rooms", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

export const getAvailableRooms = (req, res) => {
  const sql =
    "SELECT * FROM Rooms WHERE CurrentOccupancy < Capacity AND Status='Available'";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};