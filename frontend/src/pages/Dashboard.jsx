import { useEffect, useState } from "react";
import API from "../api/axios";
import StatCard from "../components/StatCard";
import ProblemCard from "../components/ProblemCard";
import TrackProblemForm from "../components/TrackProblemForm";
import ActivityItem from "../components/ActivityItem";

const Dashboard = () => {
  //State for stats (total, solved, etc.)
  const [stats, setStats] = useState(null);

  //State for tracked problems
  const [problems, setProblems] = useState([]);

  // State for recommended problems
  const [recommended, setRecommended] = useState([]);

  // Loading state (used for sections, not full page)
  const [loading, setLoading] = useState(true);

  const [activity, setActivity] = useState([]); //activity

  //state for filter feature
  const[filter , setFilter]=useState("all");

  //state for serach

  // Fetch dashboard data
  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      // SINGLE API CALL (optimized backend)
      const res = await API.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.data;

      const activityRes = await API.get("/activity", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //console.log("Activity Data:", activityRes.data);

      // Set all states
      setStats(data);
      setRecommended(data.recommended);
      setProblems(data.tracking);
      setActivity(activityRes.data.data);

    } catch (error) {
      console.log("Dashboard Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Run once when component loads
  useEffect(() => {
    fetchDashboard();
  }, []);

  //filtering
  const filteredProblems = (problems || []).filter((p) => {
    if (filter === "all") return true;
    return p.status === filter;
  });

  return (
    <div className="bg-gray-100 p-6 rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* STATS SECTION */}
      {stats ? (
        <div className="flex gap-6 flex-wrap">
          <StatCard title="Total Problems" value={stats.total} />
          <StatCard title="Solved" value={stats.solved} />
          <StatCard title="Unsolved" value={stats.unsolved} />
          <StatCard title="Progress (%)" value={stats.progress} />
          <StatCard title="Streak 🔥" value={stats.streak} />
          <StatCard title="Focus Area 🎯" value={stats.weakArea} />
        </div>
      ) : (
        <p className="text-gray-500">Loading stats...</p>
      )}

      {/* TRACK FORM */}
      <TrackProblemForm
        onSuccess={(newData) => {
          setProblems(newData);     
          fetchDashboard();         
        }}
      />
      {/*  TRACKED PROBLEMS */}
      <h2 className="text-xl font-bold mt-8 mb-4">
        Tracked Problems
      </h2>

      {/* FILTER BUTTONS HERE */}
      <div className="flex gap-3 mb-4">
        
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("solved")}
          className={`px-3 py-1 rounded ${
            filter === "solved" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          Solved
        </button>

        <button
          onClick={() => setFilter("unsolved")}
          className={`px-3 py-1 rounded ${
            filter === "unsolved" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
        >
          Unsolved
        </button>

      </div>

      {/*  PROBLEMS LIST */}
      {filteredProblems.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredProblems.map((p) => (
            <ProblemCard
              key={p._id}
              problem={p}
              onUpdate={fetchDashboard}
              setProblems={setProblems}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No problems found.
        </p>
      )}

      {/* {loading ? (
        <p className="text-gray-500">Loading problems...</p>
      ) : problems.length > 0 ? (
        <div className="flex flex-col gap-4">
          {problems.map((p) => (
            <ProblemCard key={p._id} problem={p}  onUpdate={fetchDashboard}  setProblems={setProblems} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          You haven't tracked any problems yet. Start by adding one 👆
        </p>
      )} */}

      {/* RECOMMENDED PROBLEMS  */}
      <h2 className="text-xl font-bold mt-8 mb-4">
        Recommended Problems 🎯
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading recommendations...</p>
      ) : recommended.length > 0 ? (
        <div className="flex flex-col gap-4">
          {recommended.map((p) => (
            <div
              key={p._id}
              className="bg-yellow-50 border p-4 rounded-xl shadow-sm"
            >
              <h3 className="font-semibold">{p.title}</h3>

              <p className="text-sm text-gray-500">
                {p.difficulty}
              </p>

              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                >
                  Solve Problem →
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No recommendations yet. Solve or track problems to get suggestions 🚀
        </p>
      )}
      {/* ACTIVITY SECTION */}
      <h2 className="text-xl font-bold mt-8 mb-4">
        Recent Activity
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading activity...</p>
      ) : activity.length > 0 ? (
        <div className="flex flex-col gap-3">
          {activity.map((a) => (
            <ActivityItem key={a._id} activity={a} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No activity yet.
        </p>
      )}
    </div>
  );
};

export default Dashboard;