import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// Create allotment (same as before)
export const createAllotment = (req, res) => {
  const { studentId, roomId } = req.body;

  if (!studentId || !roomId) {
    return res.status(400).json({ message: "StudentID and RoomID are required" });
  }

  const allotmentID = uuidv4().slice(0, 20);

  const sql = `INSERT INTO Allotments (AllotmentID, StudentID, RoomID, Status) 
               VALUES (?, ?, ?, 'Pending')`;

  db.query(sql, [allotmentID, studentId, roomId], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "This student already has an allotment" });
      }
      return res.status(500).json(err);
    }
    res.status(201).json({ message: "Allotment request created", allotmentID });
  });
};

// Approve allotment with capacity check
export const approveAllotment = (req, res) => {
  const allotmentID = req.params.id;

  db.beginTransaction((err) => {
    if (err) return res.status(500).json(err);

    // Get RoomID and Status of the allotment
    db.query(
      "SELECT RoomID, Status FROM Allotments WHERE AllotmentID=?",
      [allotmentID],
      (err, allotRows) => {
        if (err) return db.rollback(() => res.status(500).json(err));
        if (!allotRows.length) return db.rollback(() => res.status(404).json({ message: "Allotment not found" }));

        const { RoomID, Status } = allotRows[0];

        if (Status === "Allotted") {
          return db.rollback(() => res.status(400).json({ message: "Already approved" }));
        }

        // Get room occupancy and capacity
        db.query(
          "SELECT CurrentOccupancy, Capacity FROM Rooms WHERE RoomID=?",
          [RoomID],
          (err, roomRows) => {
            if (err) return db.rollback(() => res.status(500).json(err));
            if (!roomRows.length) return db.rollback(() => res.status(404).json({ message: "Room not found" }));

            const { CurrentOccupancy, Capacity } = roomRows[0];

            if (CurrentOccupancy >= Capacity) {
              // Room full, mark allotment as Failed
              db.query(
                "UPDATE Allotments SET Status='Failed' WHERE AllotmentID=?",
                [allotmentID],
                (err) => {
                  if (err) return db.rollback(() => res.status(500).json(err));
                  db.commit((err) => {
                    if (err) return db.rollback(() => res.status(500).json(err));
                    res.json({ message: "Cannot approve: room full. Allotment marked as Failed." });
                  });
                }
              );
            } else {
              // Room has space, approve
              db.query(
                "UPDATE Allotments SET Status='Allotted' WHERE AllotmentID=?",
                [allotmentID],
                (err) => {
                  if (err) return db.rollback(() => res.status(500).json(err));

                  // Increment occupancy
                  db.query(
                    "UPDATE Rooms SET CurrentOccupancy = CurrentOccupancy + 1 WHERE RoomID=?",
                    [RoomID],
                    (err) => {
                      if (err) return db.rollback(() => res.status(500).json(err));

                      db.commit((err) => {
                        if (err) return db.rollback(() => res.status(500).json(err));
                        res.json({ message: "Allotment approved and room occupancy updated" });
                      });
                    }
                  );
                }
              );
            }
          }
        );
      }
    );
  });
};

// Remove student from allotment
export const removeAllotment = (req, res) => {
  const allotmentID = req.params.id;

  db.beginTransaction((err) => {
    if (err) return res.status(500).json(err);

    // Get room info if the student was already allotted
    db.query(
      "SELECT RoomID, Status FROM Allotments WHERE AllotmentID=?",
      [allotmentID],
      (err, rows) => {
        if (err) return db.rollback(() => res.status(500).json(err));
        if (!rows.length) return db.rollback(() => res.status(404).json({ message: "Allotment not found" }));

        const { RoomID, Status } = rows[0];

        // Delete allotment
        db.query("DELETE FROM Allotments WHERE AllotmentID=?", [allotmentID], (err) => {
          if (err) return db.rollback(() => res.status(500).json(err));

          // Decrement occupancy only if the student was already allotted
          if (Status === "Allotted") {
            db.query(
              "UPDATE Rooms SET CurrentOccupancy = CurrentOccupancy - 1 WHERE RoomID=? AND CurrentOccupancy > 0",
              [RoomID],
              (err) => {
                if (err) return db.rollback(() => res.status(500).json(err));

                db.commit((err) => {
                  if (err) return db.rollback(() => res.status(500).json(err));
                  res.json({ message: "Allotment removed and occupancy updated" });
                });
              }
            );
          } else {
            db.commit((err) => {
              if (err) return db.rollback(() => res.status(500).json(err));
              res.json({ message: "Allotment removed" });
            });
          }
        });
      }
    );
  });
};

// Get all allotments
export const getAllotments = (req, res) => {
  const sql = `
    SELECT a.AllotmentID, a.StudentID, s.FirstName, s.LastName,
           a.RoomID, r.RoomNumber, a.Status, a.AllotDate
    FROM Allotments a
    JOIN Students s ON a.StudentID = s.StudentID
    JOIN Rooms r ON a.RoomID = r.RoomID
    ORDER BY a.AllotDate DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};