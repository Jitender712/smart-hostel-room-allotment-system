# smart-hostel-room-allotment-system

Overview

SHRAS is a hostel room allotment management system that allows admins to manage students, rooms, and allotments efficiently.
The project is organized as follows:

SHRAS/
├── shras-database        # Database scripts and schema
├── shras-backend         # Node.js + Express API
└── shras-ui-frontend     # React frontend

Backend (shras-backend)
Description

The backend is a Node.js + Express server connected to a MySQL database. It provides REST APIs for managing students, rooms, and room allotments.

Features : 

    CRUD operations for Students, Rooms, and Allotments
    Approve/Remove allotments
    Room occupancy management
    Input validation and error handling
    Swagger documentation support for APIs

Prerequisites :
    Node.js >= 18
    MySQL
    npm or yarn

Setup
Clone the repository:
        git clone <your-repo-url>
        cd SHRAS/shras-backend

Install dependencies:
        npm install

Start the server:
        npm run dev

The backend API will run on http://localhost:5000.

API Endpoints (examples)
GET /api/students – fetch all students
POST /api/allotments – create allotment request
PUT /api/allotments/:id/approve – approve allotment
DELETE /api/allotments/:id – remove allotment
GET /api/rooms/available – list available rooms

Swagger documentation is available if integrated. 
swagger link to see all apis used : http://localhost:5000/api-docs/#/ (after run the server);


Frontend (shras-ui-frontend)

    The frontend is built using React and TailwindCSS. It provides a user-friendly interface to interact with backend APIs.

Features
    Admin Dashboard with overview cards
    Room allotment management
    Students and Rooms CRUD
    Search and filter functionality
    Toast notifications using react-hot-toast
    Table actions (approve allotment, delete allotment)
    Protected routes for authenticated users

Prerequisites
    Node.js >= 18
    npm or yarn
Setup :
    Navigate to frontend:
        cd SHRAS/shras-ui-frontend
    Install dependencies:
        npm install

Configure API URL:
    Create a config.js file:    
        export const API_URL = "http://localhost:5000/api";
Start the frontend:
npm run dev

Frontend runs on http://localhost:3000.

Notes
        Make sure backend server is running before using frontend.
        Database schema is in shras-database folder.
        Use Postman or Swagger UI to test API endpoints.