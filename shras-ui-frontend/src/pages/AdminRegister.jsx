import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { UserPlus, Building2 } from "lucide-react";
import { API_URL } from "../config";
import toast from "react-hot-toast";

export default function AdminRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/admins/create`, form);

    //   setSuccess("Admin created successfully!");
      toast.success("Admin created successfully!");
    //   setError("");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      console.error(err);
    //   setError("Admin registration failed");
      toast.error("Admin registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Registration
          </h1>

          <p className="text-gray-600">
            Create a new SHRAS admin account
          </p>
        </div>

        {/* {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">
            {success}
          </div>
        )} */}

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="name"
            placeholder="Admin Name"
            onChange={handleChange}
            required
            className="w-full border px-4 py-3 rounded-lg"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full border px-4 py-3 rounded-lg"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full border px-4 py-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <UserPlus size={18} />
            Create Admin
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an admin account?{" "}
          <Link to="/" className="text-blue-600 font-medium">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}