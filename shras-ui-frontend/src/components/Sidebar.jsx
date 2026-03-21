import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BedDouble, Users } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    { to: "/rooms", icon: <BedDouble size={20} />, label: "Rooms" },
    {
      to: "/room-allotment",
      icon: <BedDouble size={20} />,
      label: "Room Allotments",
    },
    { to: "/students", icon: <Users size={20} />, label: "Students" },
  ];

  return (
    <div className="w-64 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 text-white min-h-screen p-4">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold mb-1 text-center tracking-widest uppercase">
          SH<span className="text-blue-400">RA</span>
          <span className="text-red-400">S</span>
        </h1>
        <h1 className="text-xl font-bold text-center mb-10 bg-gradient-to-r from-blue-400 via-white to-red-400 bg-clip-text text-transparent leading-snug">
          Smart Hostel Room <br /> Allotment System
        </h1>
      </div>

      <nav className="flex flex-col gap-4">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`
                flex items-center gap-3 px-4 py-2 rounded transition-all duration-200
                cursor-pointer
                ${isActive ? "bg-gradient-to-r from-blue-500 to-blue-400 font-semibold" : "hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400"}
              `}
            >
              {link.icon}
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
