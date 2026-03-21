Backend

Tech Stack: Node.js, Express, MySQL/TiDB, Axios

Features
CRUD APIs for Students, Rooms, and Allotments.
User authentication and authorization.
Paginated API responses for large datasets.
Error logging and status messages for API calls.
Handles student-room assignment logic automatically.


# Navigate to backend directory
cd smart-hostel-room-allotment-system/backend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file with DB connection, port, and secret keys
cp .env.example .env

# Start server
npm run dev

Usage
Start the backend server: npm run dev
Access APIs using http://localhost:5000 (or your configured port)
Connect frontend to backend via Axios base URLs
Example API endpoints:
GET /students – Fetch all students
POST /students – Add a new student
GET /rooms – Fetch all rooms
POST /allotments – Assign a student to a room