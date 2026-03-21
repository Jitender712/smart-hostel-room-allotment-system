import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

// Generate random Admin ID
const generateAdminId = () => {
  return "ADM" + Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Create Admin
export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const adminId = generateAdminId();

    const sql = `
      INSERT INTO Admins 
      (AdminID, Name, Email, PasswordHash)
      VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [adminId, name, email, hash], (err) => {
      if (err) {
        console.error("Create Admin Error:", err);
        return res.status(500).json(err);
      }

      res.json({ message: "Admin created successfully", adminId });
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

// Admin Login
export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM Admins WHERE Email=?";

  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const admin = result[0];

    const match = await bcrypt.compare(password, admin.PasswordHash);

    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin.AdminID, email: admin.Email },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin.AdminID,
        name: admin.Name,
        email: admin.Email,
      },
    });
  });
};

// Get All Admins
export const getAdmins = (req, res) => {
  db.query("SELECT * FROM Admins", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};