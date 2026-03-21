import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ title }) {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
      {/* Dynamic title */}
      <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
        {title || "Admin Dashboard"}
      </h2>

      <div className="flex items-center gap-6">
        <span className="text-gray-600">{admin?.name}</span>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}