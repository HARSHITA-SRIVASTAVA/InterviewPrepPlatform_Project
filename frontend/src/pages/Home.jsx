import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-violet-100 to-indigo-100 py-24 text-white">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
          Track Your Coding Progress 
          <span className="block text-purple-600">
            Like a Pro 🚀
          </span>
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-6">
          Organize LeetCode problems, monitor progress,
          revise intelligently, and stay interview-ready.
        </p>
        <div className="flex gap-4 justify-center mt-8">
        <Link
          to="/dashboard"
          className="mt-4 bg-purple-500 text-white px-8 py-4 font-bold rounded-xl hover:bg-purple-600 transition"
        >
          Start Tracking
        </Link>

        <Link
          to="/Revision"
          className="mt-4 bg-purple-500 text-white px-8 py-4 font-bold rounded-xl hover:bg-purple-600 transition"
        >
          Rivision 
        </Link>

        <Link
          to="/Analytics"
          className="mt-4 bg-purple-500 text-white px-8 py-4 font-bold rounded-xl hover:bg-purple-600 transition"
        >
          Check Your Progress
        </Link>

        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="grid md:grid-cols-3 gap-6 px-10 pb-20">

        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl text-center">
          <h3 className="font-semibold text-lg mb-2 text-gray-800">📊 Dashboard</h3>
          <p className="text-gray-700 text-medium mb-4">
            Get insights into solved and unsolved problems.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <h3 className="font-semibold text-lg mb-2 text-gray-800">🧠 Smart Tracking</h3>
          <p className="text-gray-700 text-medium mb-4">
            Track problems and update status easily.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <h3 className="font-semibold text-lg mb-2 text-gray-800">⚡ Recommendations</h3>
          <p className="text-gray-700 text-medium mb-4">
            Get suggested problems based on your progress.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Home;
