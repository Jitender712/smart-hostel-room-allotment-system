-- ========================================
-- SHRAS DATABASE
-- ========================================

-- Create database
CREATE DATABASE IF NOT EXISTS shras;
USE shras;

-- ========================================
-- Table: Students
-- ========================================
DROP TABLE IF EXISTS Students;
CREATE TABLE Students (
    StudentID VARCHAR(20) PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    PasswordHash VARCHAR(255),
    Course VARCHAR(100),
    YearOfStudy INT
);

-- Sample Students
INSERT INTO Students (StudentID, FirstName, LastName, Email, PasswordHash, Course, YearOfStudy) VALUES
('STU001', 'Alice', 'Sharma', 'alice@gmail.com', '$2b$10$dummyhash', 'BCA', 2023),
('STU002', 'Bob', 'Kumar', 'bob@gmail.com', '$2b$10$dummyhash', 'BCom', 2024),
('STU003', 'Charlie', 'Singh', 'charlie@gmail.com', '$2b$10$dummyhash', 'MCA', 2025),
('STU004', 'Diana', 'Verma', 'diana@gmail.com', '$2b$10$dummyhash', 'BSc', 2023),
('STU005', 'Ethan', 'Patel', 'ethan@gmail.com', '$2b$10$dummyhash', 'BTech', 2026),
('STU006', 'Fiona', 'Gupta', 'fiona@gmail.com', '$2b$10$dummyhash', 'BA', 2023),
('STU007', 'George', 'Reddy', 'george@gmail.com', '$2b$10$dummyhash', 'BCA', 2024),
('STU008', 'Hannah', 'Mehta', 'hannah@gmail.com', '$2b$10$dummyhash', 'BCom', 2025),
('STU009', 'Ishan', 'Shah', 'ishan@gmail.com', '$2b$10$dummyhash', 'MCA', 2026),
('STU010', 'Jaya', 'Chopra', 'jaya@gmail.com', '$2b$10$dummyhash', 'BSc', 2023),
('STU011', 'Karan', 'Nair', 'karan@gmail.com', '$2b$10$dummyhash', 'BTech', 2024),
('STU012', 'Lila', 'Khan', 'lila@gmail.com', '$2b$10$dummyhash', 'BA', 2025),
('STU013', 'Mohan', 'Rao', 'mohan@gmail.com', '$2b$10$dummyhash', 'BCA', 2026),
('STU014', 'Naina', 'Joshi', 'naina@gmail.com', '$2b$10$dummyhash', 'BCom', 2023),
('STU015', 'Om', 'Singh', 'om@gmail.com', '$2b$10$dummyhash', 'MCA', 2024),
('STU016', 'Pooja', 'Shah', 'pooja@gmail.com', '$2b$10$dummyhash', 'BSc', 2025),
('STU017', 'Ravi', 'Mehta', 'ravi@gmail.com', '$2b$10$dummyhash', 'BTech', 2026),
('STU018', 'Sana', 'Kaur', 'sana@gmail.com', '$2b$10$dummyhash', 'BA', 2023),
('STU019', 'Tarun', 'Patel', 'tarun@gmail.com', '$2b$10$dummyhash', 'BCA', 2024),
('STU020', 'Vanya', 'Sharma', 'vanya@gmail.com', '$2b$10$dummyhash', 'BCom', 2025);

-- ========================================
-- Table: Rooms
-- ========================================
DROP TABLE IF EXISTS Rooms;
CREATE TABLE Rooms (
    RoomID VARCHAR(20) PRIMARY KEY,
    RoomNumber VARCHAR(10),
    Capacity INT,
    CurrentOccupancy INT DEFAULT 0,
    RentPerMonth DECIMAL(10,2),
    IsAC TINYINT(1),
    IsAttachedWashroom TINYINT(1),
    Status VARCHAR(20) DEFAULT 'Available'
);

-- Sample Rooms
INSERT INTO Rooms (RoomID, RoomNumber, Capacity, CurrentOccupancy, RentPerMonth, IsAC, IsAttachedWashroom, Status) VALUES
('RM001', 'A-01', 2, 0, 5000.00, 1, 1, 'Available'),
('RM002', 'A-02', 2, 0, 4500.00, 0, 1, 'Available'),
('RM003', 'B-01', 3, 0, 6000.00, 1, 0, 'Available'),
('RM004', 'B-02', 3, 0, 5500.00, 0, 0, 'Available'),
('RM005', 'C-01', 1, 0, 4000.00, 1, 1, 'Available');

-- ========================================
-- Table: Allotments
-- ========================================
DROP TABLE IF EXISTS Allotments;
CREATE TABLE Allotments (
    AllotmentID VARCHAR(20) PRIMARY KEY,
    StudentID VARCHAR(20) UNIQUE,
    RoomID VARCHAR(20),
    AllotDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(20) DEFAULT 'Pending',
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID)
);

-- Optional: Sample Allotments
-- INSERT INTO Allotments (AllotmentID, StudentID, RoomID, Status) VALUES
-- ('ALT001', 'STU001', 'RM001', 'Pending');