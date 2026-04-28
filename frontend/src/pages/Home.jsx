import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Track Your Coding Progress 🚀
        </h1>

        <p className="text-gray-600 max-w-xl mb-6">
          Stay consistent, track solved problems, and improve your interview preparation with ease.
        </p>

        <Link
          to="/dashboard"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Start Tracking
        </Link>
      </div>

      {/* FEATURES SECTION */}
      <div className="grid md:grid-cols-3 gap-6 px-10 pb-20">

        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <h3 className="font-semibold text-lg mb-2">📊 Dashboard</h3>
          <p className="text-gray-500 text-sm">
            Get insights into solved and unsolved problems.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <h3 className="font-semibold text-lg mb-2">🧠 Smart Tracking</h3>
          <p className="text-gray-500 text-sm">
            Track problems and update status easily.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <h3 className="font-semibold text-lg mb-2">⚡ Recommendations</h3>
          <p className="text-gray-500 text-sm">
            Get suggested problems based on your progress.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Home;
