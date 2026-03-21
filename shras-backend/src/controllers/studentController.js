import db from "../config/db.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export const registerStudent = async (req, res) => {
  const { firstName, lastName, email, password, course, yearOfStudy } = req.body;

  const hash = await bcrypt.hash(password, 10);
  const studentID = uuidv4().slice(0, 20); // Make sure it's <=20 chars

  const sql =
    "INSERT INTO Students (StudentID, FirstName, LastName, Email, PasswordHash, Course, YearOfStudy) VALUES (?,?,?,?,?,?,?)";

  db.query(
    sql,
    [studentID, firstName, lastName, email, hash, course, yearOfStudy],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Student registered successfully", studentID });
    }
  );
};

export const getStudents = (req, res) => {
  db.query("SELECT * FROM Students", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

export const getStudentById = (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM Students WHERE StudentID=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result[0]);
    }
  );
};

export const deleteStudent = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM Students WHERE StudentID=?", [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Student deleted" });
  });
};