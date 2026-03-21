import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";
import { Trash2, Search } from "lucide-react";
import { API_URL } from "../config";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API_URL}/students`);
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await axios.delete(`${API_URL}/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredStudents = students.filter((s) =>
    `${s.FirstName} ${s.LastName}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashboardLayout title="Students">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Students</h1>

        <div className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search students..."
            className="outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Course</th>
                <th className="p-4">Year</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
          </table>

          <div className="max-h-[28rem] overflow-y-auto">
            <table className="w-full text-left">
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student.StudentID} className="border-t hover:bg-gray-50">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">
                      {student.FirstName} {student.LastName}
                    </td>
                    <td className="p-4">{student.Email}</td>
                    <td className="p-4">{student.Course}</td>
                    <td className="p-4">{student.YearOfStudy}</td>
                    <td className="p-4">
                      <button
                        onClick={() => deleteStudent(student.StudentID)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}