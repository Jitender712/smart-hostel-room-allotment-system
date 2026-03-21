import { useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { API_URL } from "../config";
import toast from "react-hot-toast";

export default function Rooms() {
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [rent, setRent] = useState("");
  const [isAC, setIsAC] = useState(false);
  const [isAttachedWashroom, setIsAttachedWashroom] = useState(false);
  const [status, setStatus] = useState("Available");
  const [loading, setLoading] = useState(false);


  const handleCreateRoom = async () => {
    if (!roomNumber || !capacity || !rent) {
      toast("Please fill all required fields")
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/rooms`, {
        roomNumber,
        capacity,
        rentPerMonth: rent,
        isAC: isAC ? 1 : 0,
        isAttachedWashroom: isAttachedWashroom ? 1 : 0,
        status,
      });

      toast.success(res.data.message || "Room created successfully")
      setRoomNumber("");
      setCapacity(1);
      setRent("");
      setIsAC(false);
      setIsAttachedWashroom(false);
      setStatus("Available");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating room")
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Rooms">
      <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-6 flex items-center bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent gap-2">
          <Plus size={24} /> Create Room
        </h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Room Number</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Capacity</label>
          <input
            type="number"
            min={1}
            className="w-full p-2 border rounded"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Rent Per Month</label>
          <input
            type="number"
            step="0.01"
            className="w-full p-2 border rounded"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAC}
              onChange={(e) => setIsAC(e.target.checked)}
            />
            AC
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAttachedWashroom}
              onChange={(e) => setIsAttachedWashroom(e.target.checked)}
            />
            Attached Washroom
          </label>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Status</label>
          <select
            className="w-full p-2 border rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        <button
          onClick={handleCreateRoom}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Room"}
        </button>
      </div>
    </DashboardLayout>
  );
}
