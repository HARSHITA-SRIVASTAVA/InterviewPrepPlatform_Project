import { useEffect, useState } from "react";  //react hook
import API from "../api/axios";               //send Http request

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

      setProblems(res.data.data);

    } catch (error) {
      console.log(error.message);
    }
};

//for : Revisied 3 Days AGO
const getDaysAgo=(date)=>{
    const today=new Date();
    const reviewDate=new Date(date);
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

return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        📘 Revision Center
      </h1>

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

        </div>
    ))}
      </div>
    </div>
  );
};

export default Revision;