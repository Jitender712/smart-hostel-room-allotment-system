import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Building2,
  BedDouble,
  ClipboardList,
  CheckCircle,
  Trash2,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { API_URL } from "../config";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [students, setStudents] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [allotments, setAllotments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const studentRes = await axios.get(`${API_URL}/students`);
      const roomRes = await axios.get(`${API_URL}/rooms`);
      const availableRes = await axios.get(`${API_URL}/rooms/available`);
      const allotRes = await axios.get(`${API_URL}/allotments`);

      setStudents(studentRes.data.length);
      setRooms(roomRes.data);
      setAvailableRooms(availableRes.data.length);
      setAllotments(allotRes.data);
    } catch (err) {
      console.error("Dashboard error:", err);
      toast.error("Failed to fetch dashboard data");
    }
  };

  // Approve allotment
  const handleApprove = async (allotmentID) => {
    try {
      const res = await axios.put(`${API_URL}/allotments/${allotmentID}/approve`);
      fetchDashboardData();
      toast.success(res.data.message || "Allotment approved successfully");
    } catch (err) {
      const msg = err.response?.data?.message || "Error approving allotment";
      toast.error(msg);
    }
  };

  // Delete allotment
  const handleDelete = async (allotmentID) => {
    if (!window.confirm("Delete this allotment?")) return;

    try {
      const res = await axios.delete(`${API_URL}/allotments/${allotmentID}`);
      fetchDashboardData();
      toast.success(res.data.message || "Allotment deleted successfully");
    } catch (err) {
      const msg = err.response?.data?.message || "Error deleting allotment";
      toast.error(msg);
    }
  };

  // Helper to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-orange-500";
      case "Allotted":
      case "Confirmed":
        return "text-green-600";
      case "Failed":
        return "text-red-500";
      default:
        return "text-gray-600";
    }
  };

  return (
    <DashboardLayout title="Dashboard">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Dashboard Overview
      </h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <Users className="text-blue-600" size={40} />
          <div>
            <p className="text-gray-500">Total Students</p>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
              {students}
            </h2>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <Building2 className="text-green-600" size={40} />
          <div>
            <p className="text-gray-500">Total Rooms</p>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
              {rooms.length}
            </h2>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <BedDouble className="text-purple-600" size={40} />
          <div>
            <p className="text-gray-500">Available Rooms</p>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
              {availableRooms}
            </h2>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <ClipboardList className="text-red-600" size={40} />
          <div>
            <p className="text-gray-500">Allotments</p>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
              {allotments.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Allotment Table */}
      {/* <div className="bg-white shadow rounded-xl p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Allotments</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Student Name</th>
              <th className="px-4 py-2 border">Room Number</th>
              <th className="px-4 py-2 border">Occupancy / Capacity</th>
              <th className="px-4 py-2 border">Room Status</th>
              <th className="px-4 py-2 border">Allotment Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allotments.map((allot, idx) => {
              const room = rooms.find((r) => r.RoomID === allot.RoomID);
              const isApproved = allot.Status === "Allotted" || allot.Status === "Confirmed";

              return (
                <tr
                  key={allot.AllotmentID}
                  className="text-center border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{allot.FirstName} {allot.LastName}</td>
                  <td className="px-4 py-2">{room?.RoomNumber || "-"}</td>
                  <td className="px-4 py-2">{room ? `${room.CurrentOccupancy}/${room.Capacity}` : "-"}</td>
                  <td className="px-4 py-2">{room?.Status || "-"}</td>
                  <td className={`px-4 py-2 font-semibold ${getStatusColor(allot.Status)}`}>
                    {allot.Status}
                  </td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleApprove(allot.AllotmentID)}
                      disabled={isApproved || allot.Status === "Failed"}
                      className={`px-3 py-1 rounded text-white ${
                        isApproved || allot.Status === "Failed"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {isApproved ? "Approved" : "Approve"}
                    </button>

                    <button
                      onClick={() => handleDelete(allot.AllotmentID)}
                      className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {allotments.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No allotments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> */}

      <div className="bg-white shadow rounded-xl p-4">
  <h2 className="text-xl font-semibold mb-4">Allotments</h2>

  <div className="max-h-[400px] overflow-y-auto border rounded-lg">
    <table className="min-w-full table-auto border-collapse">
      <thead className="sticky top-0 bg-gray-100 z-10">
        <tr>
          <th className="px-4 py-2 border">#</th>
          <th className="px-4 py-2 border">Student Name</th>
          <th className="px-4 py-2 border">Room Number</th>
          <th className="px-4 py-2 border">Occupancy / Capacity</th>
          <th className="px-4 py-2 border">Room Status</th>
          <th className="px-4 py-2 border">Allotment Status</th>
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>

      <tbody>
        {allotments.map((allot, idx) => {
          const room = rooms.find((r) => r.RoomID === allot.RoomID);
          const isApproved =
            allot.Status === "Allotted" || allot.Status === "Confirmed";

          return (
            <tr
              key={allot.AllotmentID}
              className="text-center border-b hover:bg-gray-50"
            >
              <td className="px-4 py-2">{idx + 1}</td>
              <td className="px-4 py-2">
                {allot.FirstName} {allot.LastName}
              </td>
              <td className="px-4 py-2">{room?.RoomNumber || "-"}</td>
              <td className="px-4 py-2">
                {room
                  ? `${room.CurrentOccupancy}/${room.Capacity}`
                  : "-"}
              </td>
              <td className="px-4 py-2">{room?.Status || "-"}</td>
              <td
                className={`px-4 py-2 font-semibold ${getStatusColor(
                  allot.Status
                )}`}
              >
                {allot.Status}
              </td>

              <td className="px-4 py-2 flex justify-center gap-2">
                <button
                  onClick={() => handleApprove(allot.AllotmentID)}
                  disabled={isApproved || allot.Status === "Failed"}
                  className={`px-3 py-1 rounded text-white ${
                    isApproved || allot.Status === "Failed"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {isApproved ? "Approved" : "Approve"}
                </button>

                <button
                  onClick={() => handleDelete(allot.AllotmentID)}
                  className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}

        {allotments.length === 0 && (
          <tr>
            <td colSpan="7" className="text-center py-4 text-gray-500">
              No allotments found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
    </DashboardLayout>
  );
}