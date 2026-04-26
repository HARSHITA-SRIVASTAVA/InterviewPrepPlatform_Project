import { useEffect, useState } from "react";
import API from "../api/axios";
import StatCard from "../components/StatCard";
 
const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Dashboard Data:", res.data);

        setStats(res.data.data);
      } catch (error) {
        console.log("Dashboard Error:", error.response?.data || error.message);
      }
    };

    fetchDashboard();
  }, []);
    return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {stats ? (
        <div className="flex gap-6 flex-wrap">
            <StatCard title="Total Problems" value={stats.total} />
            <StatCard title="Solved" value={stats.solved} />
            <StatCard title="Unsolved" value={stats.unsolved} />
            <StatCard title="Progress (%)" value={stats.progress} />
        </div>
        ) : (
        <p>Loading...</p>
        )}
    </div>
    );
};

export default Dashboard;