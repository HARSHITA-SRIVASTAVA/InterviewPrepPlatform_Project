import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">

      <Link
        to="/"
        className="text-2xl font-bold text-purple-600"
      >
        PrepTracker
      </Link>

      <div className="flex gap-4">

        <Link
          to="/login"
          className="px-6 py-2 rounded-lg border bg-purple-500 text-white font-bold hover:bg-purple-400"
        >
          Login
        </Link>

      </div>

    </nav>
  );
};

export default PublicNavbar;