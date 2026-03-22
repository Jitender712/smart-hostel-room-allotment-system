import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({ children, title }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* Pass title prop to Navbar */}
        <Navbar title={title} />

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}