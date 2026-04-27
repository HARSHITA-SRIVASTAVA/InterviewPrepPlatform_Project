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

  const fetchDashboard = async () => {
    try {
      //console.log("Fetching dashboard again...");
      const token = localStorage.getItem("token");

      const res = await API.get("/dashboard", {
        headers: {Authorization: `Bearer ${token}`,},
      });

      setStats(res.data.data);

      const trackingRes = await API.get("/tracking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log("Tracking Data:", trackingRes.data);

      setProblems(trackingRes.data.data);

      //activity history
      const historyRes=await API.get("/activity" ,{
        headers : {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("History Data: ",historyRes.data);
      setHistory(historyRes.data.data);

    } catch (error) {
      console.log("Dashboard Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

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
          {problems.map((p) => (
            <ProblemCard key={p._id} problem={p} onUpdate={fetchDashboard} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No problems tracked yet.
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