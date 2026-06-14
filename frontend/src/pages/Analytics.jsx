import { useEffect, useState } from "react";
import API from "../api/axios";

import {BarChart,Bar,LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid,PieChart,Pie,Cell,} from "recharts";
import DashboardLayout from "../components/DashboardLayout";

const Analytics = () => {

  const [stats, setStats] = useState(null);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data.data);

    } catch (error) {

      console.log(error.message);
    }
  };

  const topicData = stats?.topicCount
  ? Object.entries(stats.topicCount).map(
      ([topic, solved]) => ({
        topic,
        solved,
      })
    )
  : [];

  const dayOrder=["Sun","Mon","Tue","Wed","Thu","Fri","Sat",];
  const weeklyChartData = stats?.weeklyData  //stats exist -> contain weeklyData -> tranformation(map)
  ? Object.entries(stats.weeklyData).map(   //breaks object into key-value pair
      ([day, solved]) => ({
        day,
        solved,
      }))
      .sort(
        (a, b) =>
          dayOrder.indexOf(a.day) -
          dayOrder.indexOf(b.day)
      )
  : [];

  //heatmap : convert heatmap data -> colour blocks
  const heatmapEntries=stats?.heatmapData    //stats? -> data exists : otherwise app crash
      ? Object.entries(stats.heatmapData)   //backend sends object data -> effective for storage
      :[];            // React can't loop over obj using .map() -> arrays

  const difficultyData=stats?.solvedDifficulty ?  //simple and predictable 
  [
    {   
      name: "Easy",
      value: stats.solvedDifficulty.Easy,
    },
    {
      name: "Medium",
      value: stats.solvedDifficulty.Medium,
    },
    {
      name: "Hard",
      value: stats.solvedDifficulty.Hard,
    },
  ] : [];

  const COLORS = [
    "#22C55E",
    "#F59E0B",
    "#EF4444",
  ];

  return (

    <DashboardLayout>

    <div className="p-6 w-full">

      <h1 className="text-3xl font-bold mb-6">
        📊 Analytics Dashboard
      </h1>

      {/*stats starts as null , && ensures React doesn't crash by trying to read data before stats arrives */}
      {stats && (
        <div className="bg-white p-6 rounded-2xl shadow-md">

          <h2 className="text-2xl font-semibold mb-4">
            Topic Progress
          </h2>

            {/* preformatted text : display text exactly how it is written 
          <pre>
            {JSON.stringify(stats.topicCount, null, 2)}
          </pre>  */}

        <BarChart
          width={700}
          height={320}
          data={topicData || []}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="topic" />
            <YAxis />
            <Tooltip />

            <Bar
                dataKey="solved"
                fill="#3B82F6"
                radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </div>
      )}

      {stats && (
      <div className="bg-white p-6 rounded-2xl shadow-md mt-8">

          <h2 className="text-2xl font-semibold mb-6">
          📈 Weekly Solved Trend
          </h2>

          <LineChart
            width={700}
            height={320}
            data={weeklyChartData || []}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />

            <Line
                type="monotone"
                dataKey="solved"
                stroke="#10B981"
                strokeWidth={3}
            />
          </LineChart>
      </div>
      )}

      {/* Heat map  */}
      {stats && (
      <div className="bg-white p-6 rounded-2xl shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-6">
        📅 Activity Heatmap   
      </h2>

      <div className="flex flex-wrap gap-2">

        {heatmapEntries.map(([date, count]) => {

          let bgColor = "bg-gray-200";

          if (count >= 1) bgColor = "bg-green-300";
          if (count >= 3) bgColor = "bg-green-500";
          if (count >= 5) bgColor = "bg-green-700";

          return (   //tranforming data into visual grid 

            <div
              key={date}
              title={`${date} : ${count} solved`}
              className={`w-5 h-5 rounded-sm ${bgColor} flex items-center justify-center text-white text-sm font-semibold shadow-sm`}
            >
            </div>
          );
        })}

          </div>
        </div>
      )}

      {stats && (
        <div className="bg-white p-6 rounded-2xl shadow-md mt-8">

          <h2 className="text-2xl font-semibold mb-6">
            🥧 Difficulty Breakdown
          </h2>

          <div className="flex justify-center gap-6 mt-4">

            <PieChart width={400} height={300}>

              <Pie
                data={difficultyData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >

              {difficultyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </div>

        </div>
      )}
      
    </div>
    </DashboardLayout>
  );
};

export default Analytics;