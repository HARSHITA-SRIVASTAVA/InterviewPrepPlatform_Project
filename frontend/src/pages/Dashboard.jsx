import { useEffect, useState } from "react";
import API from "../api/axios";

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
    <div>
      <h1>Dashboard</h1>

      {stats ? (
        <div>
          <p>Total: {stats.total}</p>
          <p>Solved: {stats.solved}</p>
          <p>Unsolved: {stats.unsolved}</p>
          <p>Progress: {stats.progress}%</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;