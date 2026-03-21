import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { UserPlus, Building2 } from "lucide-react";
import { API_URL } from "../config";
import toast from "react-hot-toast";

export default function StudentRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    course: "",
    yearOfStudy: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/students/register`, form);
      toast.success("Student registered successfully!")
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      toast.error('"Registration failed"')
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
            Student Registration
          </h1>

          <p className="text-gray-600">
            Create your SHRAS student account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            required
            className="w-full border px-4 py-3 rounded-lg"
          />

          <input
            name="lastName"
            placeholder="Last Name"
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

          <input
            name="course"
            placeholder="Course"
            onChange={handleChange}
            required
            className="w-full border px-4 py-3 rounded-lg"
          />

          <input
            name="yearOfStudy"
            placeholder="Year of Study"
            onChange={handleChange}
            required
            className="w-full border px-4 py-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <UserPlus size={18} />
            Register
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already admin?{" "}
          <Link to="/" className="text-blue-600 font-medium">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}