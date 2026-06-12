import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Revision", path: "/revision" },
    { name: "Analytics", path: "/analytics" },
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r shadow-sm">

      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-purple-600">
          PrepTracker
        </h1>
      </div>

      <div className="p-4 space-y-2">

        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-3 rounded-xl transition ${
              location.pathname === item.path
                ? "bg-purple-100 text-purple-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            {item.name}
          </Link>
        ))}

      </div>

    </div>
  );
};

export default Sidebar;