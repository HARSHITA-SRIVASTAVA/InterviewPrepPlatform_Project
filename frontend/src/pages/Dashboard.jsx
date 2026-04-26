import { useEffect, useState } from "react";
import API from "../api/axios";
import StatCard from "../components/StatCard";
import ProblemCard from "../components/ProblemCard";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // 🔹 Get token
        const token = localStorage.getItem("token");

        // 🔹 Fetch dashboard stats
        const res = await API.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Dashboard Data:", res.data);

        // 🔹 Correct mapping
        setStats(res.data.data);

        // 🔹 Fetch tracked problems
        const trackingRes = await API.get("/tracking", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Tracking Data:", trackingRes.data);

        // 🔹 IMPORTANT: adjust if nested
        setProblems(trackingRes.data.data);

      } catch (error) {
        console.log(
          "Dashboard Error:",
          error.response?.data || error.message
        );
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* 🔹 Stats Section */}
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

      {/* 🔹 Tracked Problems Section */}
      <h2 className="text-xl font-bold mt-8 mb-4">
        Tracked Problems
      </h2>

      {problems.length > 0 ? (
        <div className="flex flex-col gap-4">
          {problems.map((p) => (
            <ProblemCard key={p._id} problem={p} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No problems tracked yet.
        </p>
      )}
    </div>
  );
};

export default Dashboard;