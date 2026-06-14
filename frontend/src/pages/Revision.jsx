import { useEffect, useState } from "react";  //react hook
import API from "../api/axios";    //send Http request

import { toast } from "react-toastify";  //for notification 

import DashboardLayout from "../components/DashboardLayout";


const Revision = () => {

  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetchRevisionProblems();
  }, []);   // []->No dependency (loads only once: first time)

  const fetchRevisionProblems = async () => {   //fetch from backend
    try {

      const token = localStorage.getItem("token"); //JWT AUTH TOKEN 

      const res = await API.get("/tracking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    //setProblems(res.data.data);

    //sort problems
    const sortedProblems=res.data.data.sort(
        (a,b)=>
            new Date(a.lastReviewed)-new Date(b.lastReviewed)  //comparator
    );
    setProblems(sortedProblems);


    } catch (error) {
      toast.error("Failed to update revision");
    }
};

//Adding Mark as Revised button 
const handleRevision = async (trackingId) => {
  try {
    const token = localStorage.getItem("token");
    await API.put(
      `/tracking/${trackingId}`,
      {
        status: "solved",   //mark as solved 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
     toast.success("Problem revised successfully!");
    fetchRevisionProblems();

  } catch (error) {
    console.log(error.message);
  }
};

//for : Revisied 3 Days AGO
const getDaysAgo=(date)=>{
    const today=new Date();
    const reviewDate=new Date(date);

    //remove time part 
    today.setHours(0,0,0,0);
    reviewDate.setHours(0,0,0,0);
    
    const diffTime=today-reviewDate;    //ms

    const diffDays=Math.floor(diffTime/(1000*60*60*24));

    if(diffDays==0) return "Today";

    if(diffDays==1) return "1 days ago";

    return `${diffDays} days ago`;
};

//show need Rvision if not revised for 3+days
const needsRevision=(date)=>{
    const today=new Date();
    const reviewDate=new Date(date);

    const diffTime=today-reviewDate;

    const diffDays=Math.floor(diffTime/(1000*60*60*24));

    return diffDays>3;  //True if not revisied for >=3 days 
}

const revisionStats = {
  dueToday: problems.length,
  revisedToday: 2, // static for now
  overdue: problems.filter((p) =>
    needsRevision(p.lastReviewed)
  ).length,
  streak: 7, // static for now
};

return (

  <DashboardLayout level={1}>

    <div className="p-6">

      <div className="mb-8">
  <h1 className="text-4xl font-bold text-gray-900">
    📘 Revision Center
  </h1>

  <p className="text-gray-500 mt-2">
    Review previously solved problems and strengthen long-term retention.
  </p>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-xl mb-4">
      📚
    </div>

    <p className="text-gray-500 text-sm">
      Due Today
    </p>

    <h3 className="text-3xl font-bold mt-1">
      {revisionStats.dueToday}
    </h3>
  </div>

  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-xl mb-4">
      ✅
    </div>

    <p className="text-gray-500 text-sm">
      Revised Today
    </p>

    <h3 className="text-3xl font-bold mt-1">
      {revisionStats.revisedToday}
    </h3>
  </div>

  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-xl mb-4">
      ⏰
    </div>

    <p className="text-gray-500 text-sm">
      Overdue
    </p>

    <h3 className="text-3xl font-bold mt-1">
      {revisionStats.overdue}
    </h3>
  </div>

  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-xl mb-4">
      🔥
    </div>

    <p className="text-gray-500 text-sm">
      Revision Streak
    </p>

    <h3 className="text-3xl font-bold mt-1">
      {revisionStats.streak}
    </h3>
  </div>

</div>

      <div className="grid md:grid-cols-2 gap-4">

        {problems.map((item) => (  //Mapping 

          <div
            key={item._id}
            className="bg-white p-5 rounded-2xl shadow-md">

                {/* flex:side-by-side ,justify-between:center gap , items-start:celling */}
            <div className="flex justify-between items-start">   
                <h2 className="text-xl font-semibold">
                {item.problem?.title}
                </h2>

                {needsRevision(item.lastReviewed) && (  //if false stop reading immediately 
                    <span  className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                        🔥 Needs Revision
                    </span>
                )}
            </div>

            <p className="text-gray-500 mt-1">
              {item.problem?.difficulty}
            </p>

            <p className="mt-3 text-sm text-gray-600">
              Last Reviewed:
            </p>

            <p className="font-medium">
                {new Date(item.lastReviewed).toLocaleDateString("en-GB")}
                {" • "}
                {getDaysAgo(item.lastReviewed)}
            </p>

            <button 
            onClick={() => handleRevision(item._id)}
            className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm transition">
                ✅ Mark Revised
            </button>

        </div>
    ))}
      </div>
    </div>
    </DashboardLayout>
  );
};

export default Revision;