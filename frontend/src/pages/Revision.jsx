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

            <h2 className="text-xl font-semibold">
              {item.problem?.title}
            </h2>

            <p className="text-gray-500 mt-1">
              {item.problem?.difficulty}
            </p>

            <p className="mt-3 text-sm text-gray-600">
              Last Reviewed:
            </p>

            <p className="font-medium">
              {new Date(item.lastReviewed).toLocaleDateString("en-GB")}  
               {/* en-GB: for dd/mm/year format */}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Revision;