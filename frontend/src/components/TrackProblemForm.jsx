import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

const TrackProblemForm = ({ onSuccess }) => {
  const [problemId, setProblemId] = useState("");
  const [status, setStatus] = useState("unsolved");
  const [problemList, setProblemList] = useState([]);

  //error message on adding duplicates
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  // Fetch all problems for dropdown
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await API.get("/problems");
        setProblemList(res.data.data);
      } catch (error) {
        console.log("Error fetching problems:", error.message);
      }
    };

    fetchProblems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setMessage("")

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/tracking",
        {
          problemId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      // SUCCESS
      // setMessage("Problem tracked successfully ✅");
      toast.success("Problem tracked!");

      //Reset
      setProblemId("");
      setStatus("unsolved");

      //Update UI instantly
      onSuccess(res.data.data);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Already tracked! You can update your progress in the dashboard"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-md mt-6"
    >
      <h2 className="font-semibold mb-3">Track New Problem</h2>

      {/* Dropdown instead of input */}
      <select
        value={problemId}
        onChange={(e) => setProblemId(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        required
      >
        <option value="">Select a problem</option>

        {problemList.map((p) => (
          <option key={p._id} value={p._id}>
            {p.title} ({p.difficulty})
          </option>
        ))}
      </select>

      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      >
        <option value="unsolved">Unsolved</option>
        <option value="solved">Solved</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Problem
      </button>

      {message && (
        <p className="text-green-600 mt-2 text-sm">
          {message}
        </p>
      )}

      {error && (
        <p className="text-red-500 mt-2 text-sm">
          {error}
        </p>
      )}
          </form>
        );
      };

export default TrackProblemForm;