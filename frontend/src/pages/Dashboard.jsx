import { useEffect, useState } from "react";
import API from "../api/axios";
import StatCard from "../components/StatCard";
import ProblemCard from "../components/ProblemCard";
import TrackProblemForm from "../components/TrackProblemForm";
import ActivityItem from "../components/ActivityItem";

//navbar
import { useNavigate } from "react-router-dom";

//sidebar
import Sidebar from "../components/Sidebar";

//header
import Header from "../components/Header";

//progress chart
import {ResponsiveContainer,PieChart,Pie,Cell,Tooltip,}from "recharts";

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

  //for filter serach by difficulty
  const [difficultyFilter , setDifficultyFilter] = useState("All");

  //for filter serach by tags(Array,LL,string..)
  const [tagFilter,setTagFilter]=useState("All");  

  const navigate = useNavigate();

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

    //difficulty filter
    const matchesDifficulty=difficultyFilter=="All" || p.problem.difficulty === difficultyFilter;

    //tag filter
    const matchesTag=tagFilter=="All" || p.problem.tags?.some(
      (tag)=>tag.toLowerCase().includes(tagFilter.toLowerCase())
    );

    return matchesFilter && matchesSearch && matchesDifficulty && matchesTag;
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
    <div className="flex bg-slate-50 min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header level={stats?.level || 1} />
        <main className="flex-1 p-6">

      {stats && (
  <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 rounded-3xl p-8 text-white shadow-xl">

    <div className="flex justify-between items-start">

      {/* Left Side */}

      <div>

        <h1 className="text-4xl font-bold mb-2">
          Welcome Back 👋
        </h1>

        <p className="text-purple-100 text-lg">
          Keep solving, you're building consistency every day.
        </p>

        <div className="flex gap-8 mt-6">

          <div>
            <p className="text-purple-200 text-sm">
              Level
            </p>

            <p className="text-2xl font-bold">
              {stats.level}
            </p>
          </div>

          <div>
            <p className="text-purple-200 text-sm">
              XP
            </p>

            <p className="text-2xl font-bold">
              {stats.xp}
            </p>
          </div>

          <div>
            <p className="text-purple-200 text-sm">
              Next Level
            </p>

            <p className="text-2xl font-bold">
              {stats.xpNeeded - stats.currentLevelXP}
            </p>
          </div>

        </div>

      </div>

      {/* Right Side Buttons */}

      <div className="flex gap-3">

        <button className="bg-white text-purple-700 font-semibold px-5 py-3 rounded-xl hover:bg-purple-50 transition"
          onClick={()=> document.getElementById("tracked-problems")
            ?.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          Track Problem
        </button>

        <button className="bg-purple-800 px-5 py-3 rounded-xl hover:bg-purple-900 transition"
          onClick={() => navigate("/revision")}
          className="bg-purple-800 px-5 py-3 rounded-xl"
        >
          Start Revision
        </button>

      </div>

    </div>

    {/* Progress Bar */}

    <div className="mt-8">
      <div className="flex justify-between mb-2 text-sm text-purple-100">
        <span>
          Level Progress
        </span>
        <span>
          {stats.currentLevelXP}/{stats.xpNeeded}
        </span>
      </div>
      <div className="h-4 bg-purple-300 rounded-full overflow-hidden">
        <div
          className="bg-white h-4 rounded-full transition-all duration-700"
          style={{
            width: `${
              (stats.currentLevelXP /
                stats.xpNeeded) *
              100
            }%`,
          }}
        />
              </div>
            </div>
          </div>
        )}

      {/* STATS SECTION */}
      
      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mt-6">
          <StatCard title="Total Problems" value={stats.total} icon="📚" iconBg="bg-purple-100" />
          <StatCard title="Solved" value={stats.solved} icon="✅" iconBg="bg-green-100" />
          <StatCard title="Unsolved" value={stats.unsolved} icon="⏳" iconBg="bg-orange-100"/>
          {/* <StatCard title="Progress (%)" value={stats.progress} /> */}
          <StatCard title="Streak" value={stats.streak} icon="🔥" iconBg="bg-red-100"/>
          <StatCard title="Focus Area" value={stats.weakArea}  icon="🎯" iconBg="bg-pink-100"/>
        </div>
      ) : (
        <p className="text-gray-500">Loading stats...</p>
      )}


    {stats && (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-5">
          Progress Overview
        </h2>
        <div className="grid grid-cols-12 gap-6">

          {/* Achievement */}
          <div className="col-span-12 lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border">
            <h3 className="font-semibold text-lg mb-4">
              🏅 Achievements
            </h3>
            <div className="flex flex-wrap gap-3">
              {stats.achievements.map((badge,index) => (
                <div
                  key={index}
                  className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-xl text-sm font-semibold w-fit"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* level progress*/}
          <div className="col-span-12 lg:col-span-6 bg-white rounded-2xl p-6 shadow-sm border">
            <h3 className="font-semibold text-lg mb-4">
              🏆 Level Progress
            </h3>
            <div className="flex justify-between mb-2">
              <span>Level {stats.level}</span>
              <span>{stats.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 h-3 rounded-full">
              <div
                className={`${getColor()} h-3 rounded-full`}
                style={{
                  width: `${stats.progress}%`,
                }}
              />
            </div>
          </div>

          {/* Daily Goal*/}
          <div className="col-span-12 lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">
                🎯 Daily Goal
              </h3>
              <span className="text-sm text-gray-500">
                {stats.solvedToday}/{stats.dailyGoal} Solved Today
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Number(stats?.dailyProgress || 0)}%`, }}
              ></div>

              </div>
              <p className="mt-3 text-sm text-gray-600">
                {Number(stats?.dailyProgress || 0)}% completed
              </p>

            </div>
        </div>
      </div>
    )}

      {/* Progess Chart */}
        <h2 className="text-2xl font-bold mb-6 mt-6">
        Progress by Difficulty 📊
      </h2>

      {stats && (
     <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mt-8">
      <div className="flex flex-col lg:flex-row items-center gap-8">
      <div className="w-full lg:w-1/2 h-[320px]">

      <PieChart width={350} height={320}>
        <Pie
          data={difficultyData}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          dataKey="value"
          paddingAngle={4}>
          <Cell fill="#22c55e" />
          <Cell fill="#f59e0b" />
          <Cell fill="#ef4444" />
        </Pie>
        <Tooltip />
      </PieChart>
      </div>

      <div className="space-y-4 w-full lg:w-1/2">
        <div className="flex justify-between p-4 rounded-xl bg-green-50 border border-green-100 hover:shadow-sm transition-all">
          <span className="font-medium text-green-700">
            Easy
          </span>
          <span>
            {difficultyData[0]?.value} solved
          </span>
        </div>

        <div className="flex justify-between p-4 rounded-xl bg-amber-50 border border-amber-100 hover:shadow-sm transition-all">
          <span className="font-medium text-amber-700">
            Medium
          </span>
          <span>
            {difficultyData[1]?.value} solved
          </span>
        </div>

        <div className="flex justify-between p-4 rounded-xl bg-red-50 border border-red-100 hover:shadow-sm transition-all">
          <span className="font-medium text-red-700">
            Hard
          </span>
          <span>
            {difficultyData[2]?.value} solved
          </span>
        </div>
      </div>
      </div>
      </div>
      )}
      
      {/* TRACK FORM */}
      <div id="tracked-problems">
      <TrackProblemForm 
        onSuccess={(newData) => {
          setProblems(newData);     
          fetchDashboard();         
        }}
      />
      </div>

      {/*  TRACKED PROBLEMS */}
      <h2 className="text-2xl font-bold mb-6 mt-6">
        Tracked Problems
      </h2>
      
      <input
        type="text"
        placeholder="🔍 Search problems..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-5 py-3 border rounded-2xl border-gray-200 bg-white text-gray-700 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
      />

      

      {/* FILTER BUTTONS HERE */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        {/* Status Filter Buttons */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">

          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              filter === "all"
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("solved")}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              filter === "solved"
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Solved
          </button>

          <button
            onClick={() => setFilter("unsolved")}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              filter === "unsolved"
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Unsolved
          </button>

        </div>

        <div className="flex gap-2">

          {/* Difficulty Dropdown */}
          <select
            value={difficultyFilter}
            onChange={(e) =>
              setDifficultyFilter(e.target.value)
            }
            className="border border-gray-300 px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Tag Dropdown filter */}
          <select value={tagFilter} onChange={(e)=>setTagFilter(e.target.value)} 
            className="border border-gray-300 px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all">
            
              <option value="All">All Tags</option>

              <option value="Array">Array</option>
              <option value="Stack">Stack</option>
              <option value="HashMap">HashMap</option>
              <option value="Sorting">Sorting</option>
              <option value="Tree">Tree</option>
          </select>
        </div>

      </div>

      {/*  PROBLEMS LIST */}
      {filteredProblems.length > 0 ? (
        <div className="flex flex-col gap-4 grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
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

      {/* RECOMMENDED PROBLEMS */}
      <div className="flex justify-between items-center mb-6 mt-5">
      <h2 className="text-2xl font-bold">
        Recommended Problem 
      </h2>

      <span className="text-sm text-purple-600 font-medium">
        Based on your weak areas
      </span>
    </div>
    
    {loading ? (
      <p className="text-gray-500">Loading recommendations...</p>
    ) : recommended.length > 0 ? (

      <div className="grid md:grid-cols-2 gap-4">

        {recommended.map((p) => (
          <div
            key={p._id}
            className="border border-gray-200 bg-white rounded-2xl p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">

              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {p.title}
                </h3>

                <span
                  className={`inline-block mt-2 px-4 py-1 rounded-xl text-xs font-medium
                  ${
                    p.difficulty === "Easy"
                      ? "bg-green-100 text-green-700"
                      : p.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {p.difficulty}
                </span>
              </div>

            </div>

            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-purple-600 font-medium hover:text-purple-800"
              >
                Solve Problem →
              </a>
            )}
          </div>
        ))}

      </div>

    ) : (
      <p className="text-gray-500">
        You're doing great 🎉
      </p>
    )}
  

      {/* RECENT ACTIVITY */}
      <div className="flex justify-between items-center mb-6 mt-5">
        <h2 className="text-2xl font-bold ">
          Recent Activity 
        </h2>

        <span className="text-sm text-purple-600 font-medium">
          Last tracked updates
        </span>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading activity...</p>
      ) : activity.length > 0 ? (

        <div className="space-y-4">

          {activity.map((a) => (
            <div
              key={a._id}
              className="bg-white flex items-center justify-between border border-gray-200 rounded-xl p-4 hover:border-purple-200 hover:shadow-sm transition"
            >
              <div>
                <h3 className="font-semibold text-gray-800">
                  {a.problem?.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {new Date(a.updatedAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium
                ${
                  a.status === "solved"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {a.status}
              </span>
            </div>
          ))}

        </div>

      ) : (
        <p className="text-gray-500">
          No activity yet.
        </p>
      )}
    </main>
    </div>
    </div>
  );
};

export default Dashboard;