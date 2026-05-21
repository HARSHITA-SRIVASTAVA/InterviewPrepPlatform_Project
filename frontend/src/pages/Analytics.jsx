import { useEffect, useState } from "react";
import API from "../api/axios";

import {BarChart,Bar,LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid,} from "recharts";

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

  return (

    <div className="p-6">

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

            <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topicData}>
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
            </ResponsiveContainer>
            </div>
        </div>
        )}

        {stats && (
        <div className="bg-white p-6 rounded-2xl shadow-md mt-8">

            <h2 className="text-2xl font-semibold mb-6">
            📈 Weekly Solved Trend
            </h2>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyChartData}>

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
                </ResponsiveContainer>
            </div>
        </div>
        )}
    </div>
  );
};

export default Analytics;