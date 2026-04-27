import { useEffect, useState } from "react";
import API from "../api/axios";
import StatCard from "../components/StatCard";
import ProblemCard from "../components/ProblemCard";
import TrackProblemForm from "../components/TrackProblemForm";
import ActivityItem from "../components/ActivityItem";


const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [problems, setProblems] = useState([]);
  const [history , setHistory]=useState([]);   //adding new state
  const [recommended,setRecommended]=useState([]);  //display recommended problem
  const [loading , setLoading]=useState(true);    //display loading until whole data fetched 

  const fetchDashboard = async () => {
  try {
    setLoading(true); // start loading

    const token = localStorage.getItem("token");

    // PARALLEL API CALLS
    const [dashboardRes, trackingRes] = await Promise.all([
      API.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      API.get("/tracking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    //Set dashboard stats
    setStats(dashboardRes.data.data);

    //Set recommended problems
    setRecommended(dashboardRes.data.data.recommended);

    //Set tracked problems
    setProblems(trackingRes.data.data);

  } catch (error) {
    console.log("Dashboard Error:", error.response?.data || error.message);
  } finally {
    setLoading(false); // stop loading
  }
};

  useEffect(() => { fetchDashboard(); }, []);

  if(loading){
    return(
      <div className="p-6">
        <h1 className="text-2xl fond-bold">Dashboard</h1>
        <p className="mt-4 text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Section */}
      {stats ? (
        <div className="flex gap-6 flex-wrap">
          <StatCard title="Total Problems" value={stats.total} />
          <StatCard title="Solved" value={stats.solved} />
          <StatCard title="Unsolved" value={stats.unsolved} />
          <StatCard title="Progress (%)" value={stats.progress} />
          <StatCard title="Current Streak 🔥" value={stats.streak} />
          <StatCard title="Focus Area 🎯" value={stats.weakArea} />
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
      
      {/* Tracking Problems */}
      <TrackProblemForm onSuccess={fetchDashboard} />
      {/* Tracked Problems Section */}
      <h2 className="text-xl font-bold mt-8 mb-4">
        Tracked Problems
      </h2>

      {problems.length > 0 ? (
        <div className="flex flex-col gap-4">
          {problems.map((p) => (   //loop through each problem
            <ProblemCard key={p._id} problem={p} onUpdate={fetchDashboard} />
          ))}
        </div>
      ) : (
      <p className="text-gray-500">
        You haven't tracked any problems yet. Start by adding one above 👆
      </p>
      )}

      <h2 className="text-xl font-bold mt-8 mb-4">
        Recommended Problems 🎯
      </h2>

      {recommended.length > 0 ? (
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
      <h2 className="text-x1 font-bold mt-8 mb-4">
        Recent Activity
      </h2>

      <h2 className="text-xl font-bold mt-8 mb-4">
        Recent Activity
      </h2>

      {history.length > 0 ? (
        <div className="flex flex-col gap-3">
          {history.map((item) => (
            <ActivityItem key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No recent activity
        </p>
      )}
    </div>
  );
};

export default Dashboard;