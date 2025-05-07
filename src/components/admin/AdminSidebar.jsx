import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FaHome, FaBox, FaSignOutAlt } from "react-icons/fa";

export default function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-gray-800 min-h-screen p-4">
      <div className="text-white text-xl font-bold mb-8">Admin Dashboard</div>
      <nav className="space-y-2">
        <Link
          to="/admin"
          className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
            isActive("/admin")
              ? "bg-red-600 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          <FaHome />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/admin/products"
          className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
            isActive("/admin/products")
              ? "bg-red-600 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          <FaBox />
          <span>Products</span>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-red-600 rounded-lg transition-colors"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}
