import { useState, useEffect } from "react";
import axios from "axios";
import { BedDouble, Users, Home, LogOut } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { API_URL } from "../config";
import toast from "react-hot-toast";

// Main RoomAllotment component
function RoomAllotment() {
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomRes, studentRes] = await Promise.all([
          axios.get(`${API_URL}/rooms`),
          axios.get(`${API_URL}/students`),
        ]);

        setRooms(Array.isArray(roomRes.data) ? roomRes.data : []);
        setStudents(Array.isArray(studentRes.data) ? studentRes.data : []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setRooms([]);
        setStudents([]);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAllotment = async () => {
    if (!selectedRoom || !selectedStudent)
     return toast("Please select student and room",{ icon: "⚠️" });

    try {
      const res = await axios.post(`${API_URL}/allotments`, {
        studentId: selectedStudent,
        roomId: selectedRoom,
      });
      toast.success(res.data.message || "Room allotted successfully")

      const roomRes = await axios.get(`${API_URL}/rooms`);
      setRooms(Array.isArray(roomRes.data) ? roomRes.data : []);
    } catch (err) {

      toast.error(err.response?.data?.message || "Error allotting room")
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Room Allotment</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Students Dropdown */}
        <div>
          <label className="block mb-2 font-semibold">Select Student</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">-- Select Student --</option>
            {Array.isArray(students) &&
              students.map((s) => (
                <option key={s.StudentID} value={s.StudentID}>
                  {s.FirstName} {s.LastName}
                </option>
              ))}
          </select>
        </div>

        {/* Rooms Dropdown */}
        <div>
          <label className="block mb-2 font-semibold">Select Room</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            <option value="">-- Select Room --</option>
            {Array.isArray(rooms) &&
              rooms.map((r) => (
                <option
                  key={r.RoomID}
                  value={r.RoomID}
                  disabled={r.Occupied >= r.Capacity}
                >
                  {r.RoomNumber} ({r.CurrentOccupancy}/{r.Capacity} occupied)
                </option>
              ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleAllotment}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Allot Room
      </button>

      {/* Room Status Table */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Room Status</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Room</th>
              <th className="border p-2">Capacity</th>
              <th className="border p-2">Occupied</th>
                <th className="border p-2">Rent Per Month</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">AC</th>
              <th className="border p-2">Washroom</th>

            </tr>
          </thead>
          <tbody>
            {Array.isArray(rooms) &&
              rooms.map((r) => (
                <tr key={r.RoomID}>
                  <td className="border p-2 flex items-center gap-2">
                    <BedDouble size={20} /> {r.RoomNumber}
                  </td>
                  <td className="border p-2">{r.Capacity}</td>
                  <td className="border p-2">{r.CurrentOccupancy}</td>
                     <td className="border p-2">{r.RentPerMonth}</td>
                  <td className="border p-2">{r.Status}</td>
                     <td className="border p-2">{r.IsAC ? 'Yes':'No'}</td>
                  <td className="border p-2">{r.IsAttachedWashroom ? 'Yes':'No'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main Page Component
export default function RoomAllotmentPage() {
  const [selectedMenu, setSelectedMenu] = useState("Room Allotment");

  return (
    <DashboardLayout title="Room Allotment">
      <RoomAllotment />
    </DashboardLayout>
  );
}
