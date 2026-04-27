import { useState } from "react";
import API from "../api/axios";

const TrackProblemForm = ({ onSuccess }) => {
  const [problemId, setProblemId] = useState("");  //store _id String
  const [status, setStatus] = useState("unsolved"); //store status

  const handleSubmit = async (e) => {
    e.preventDefault();   //prevent default refresing bhevaiour

    try {
      const token = localStorage.getItem("token");

      const res = await API.post("/tracking",{problemId,status,},
        {headers: {Authorization: `Bearer ${token}`},
      });

      console.log("Tracked:", res.data);

      // Reset form
      setProblemId("");
      setStatus("unsolved");

      // Refresh dashboard
      onSuccess(res.data.data);

    } catch (error) {
      console.log(
        "Tracking Error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-md mt-6">
      <h2 className="font-semibold mb-3">Track New Problem</h2>

      {/* Problem ID */}
      <input
        type="text"
        placeholder="Enter Problem ID"
        value={problemId}
        onChange={(e) => setProblemId(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        required
      />

      {/* Status Dropdown */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 w-full mb-3 rounded">

        <option value="unsolved">Unsolved</option>
        <option value="solved">Solved</option>
      </select>

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Problem
      </button>
    </form>
  );
};

export default TrackProblemForm;