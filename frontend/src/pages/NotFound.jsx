import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6">

      <h1 className="text-8xl font-bold text-purple-600">
        404
      </h1>

      <h2 className="text-3xl font-bold mt-4 text-gray-900">
        Page Not Found
      </h2>

      <p className="text-gray-500 mt-3 text-center max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
      >
        Back to Home
      </Link>

    </div>
  );
};

export default NotFound;