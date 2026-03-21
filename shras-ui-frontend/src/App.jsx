import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RoomAllotmentPage from "./pages/RoomAllotmentPage";
import AdminRegister from "./pages/AdminRegister";
import PrivateRoute from "./components/PrivateRoute";
import StudentRegister from "./pages/StudentRegister";
import Students from "./pages/Student";
import Rooms from "./pages/Rooms";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Login */}
          <Route path="/" element={<Login />} />

          {/* Student Register */}
          <Route path="/student-register" element={<StudentRegister />} />

          {/* Admin Register */}
          <Route path="/admin-register" element={<AdminRegister />} />

          {/* Dashboard (Protected) */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Rooms (Protected) */}
          <Route
            path="/rooms"
            element={
              <PrivateRoute>
                <Rooms />
              </PrivateRoute>
            }
          />

          <Route
            path="/room-allotment"
            element={
              <PrivateRoute>
                <RoomAllotmentPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/students"
            element={
              <PrivateRoute>
                <Students />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}