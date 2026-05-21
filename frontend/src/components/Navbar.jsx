import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();              // clear token
    navigate("/login");    // redirect
  };

  return (
    <nav className="bg-white text-black dark:bg-gray-900 dark:text-white px-6 py-4 flex justify-between items-center">
      
      {/* Logo / Brand */}
      <h1 className="text-xl font-bold">
        
        <Link to="/" className="hover:text-blue-300">
          PrepTracker
        </Link>
        
      </h1>

      {/* Links */}
      <div className="flex items-center gap-4">

        <Link to="/" className="hover:text-blue-300">
          Home
        </Link>

        {token && (
          <Link to="/dashboard" className="hover:text-blue-300">
            Dashboard
          </Link>
        )}

        {token &&(
          <Link to="/revision" className="hover:text-blue-300">
            Revision
          </Link>
        )}

        {token &&(
          <Link to="/analytics" className="hover:text-blue-300">
            Analytics
          </Link>
        )}

        {/* <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-700 px-3 py-1 rounded">
          {darkMode ? "☀" : "🌙"}
        </button> */}

        {/* Logout Button */}
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
          >
            Login
          </Link>


        )}
      </div>
    </nav>
  );
};

export default Navbar;