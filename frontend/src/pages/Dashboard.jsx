import { useEffect, useState } from "react";
import API from "../api/axios";
import StatCard from "../components/StatCard";
import ProblemCard from "../components/ProblemCard";
import TrackProblemForm from "../components/TrackProblemForm";
import ActivityItem from "../components/ActivityItem";
import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid,Cell,} from "recharts";

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

  //state for search feature
  const [search , setSearch]=useState("");

  //add notes
  const [notes , setNotes]=useState("");

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
   const matchesFilter=
    filter=="all" || p.status==filter;

    const matchesSearch = p.problem.title?.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getColor = () => {
    if (stats.progress < 40) return "bg-red-500";
    if (stats.progress < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const difficultyData = [
    { name: "Easy", value: stats?.solvedDifficulty?.Easy || 0 },
    { name: "Medium", value: stats?.solvedDifficulty?.Medium || 0 },
    { name: "Hard", value: stats?.solvedDifficulty?.Hard || 0 },
  ];

 // console.log(stats.dailyProgress);

  return (
    <div className="min-h screen bg-gray-100 p-6 rounded-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Track your coding progress 🚀
        </p>
</    div>

      {/* STATS SECTION */}
      {stats ? (
        <div className="flex gap-6 flex-wrap">
          <StatCard title="Total Problems" value={stats.total} />
          <StatCard title="Solved" value={stats.solved} />
          <StatCard title="Unsolved" value={stats.unsolved} />
          {/* <StatCard title="Progress (%)" value={stats.progress} /> */}
          <StatCard title="Streak 🔥" value={stats.streak} />
          <StatCard title="Focus Area 🎯" value={stats.weakArea} />
        </div>
      ) : (
        <p className="text-gray-500">Loading stats...</p>
      )}

      {/* progress bar */}
      {stats && (
        <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 font-medium">
              Progress
            </span>
            <span className="font-semibold">
              {stats.progress}%
            </span>
          </div>
          {/* BAR CONTAINER */}
          <div className="w-full bg-gray-200 h-3 rounded-full">

            {/* FILLED BAR */}
            <div
              className={`${getColor()} h-3 rounded-full transition-all duration-500`}
              style={{ width: `${stats.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Daily Goal Trcaker */}
      {stats && (
        <div className="bg-white rounded-2xl shadow-md p-5 mt-6">
  
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">
            🎯 Daily Goal
          </h2>

          <span className="text-sm text-gray-500">
            {stats.solvedToday}/{stats.dailyGoal} Solved Today
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          
          <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${Number(stats?.dailyProgress || 0)}%`, }}
          ></div>

          </div>

          <p className="text-sm text-gray-600 mt-2">
            {Number(stats?.dailyProgress || 0)}% completed
          </p>

        </div>
      )}

      {/* Progess Chart */}
      {stats && (
     <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-6">
        Progress by Difficulty 📊
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={difficultyData}>
          
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="value"
            radius={[10, 10, 0, 0]}
          >
            <Cell fill="#22c55e" />
            <Cell fill="#f59e0b" />
            <Cell fill="#ef4444" />
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
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
      
      
      <input
        type="text"
        placeholder="🔍 Search problems..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

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
          You're doing great 🎉 Try exploring new problems!
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