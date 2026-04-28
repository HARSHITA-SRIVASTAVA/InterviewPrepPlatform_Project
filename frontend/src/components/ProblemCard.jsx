import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

const ProblemCard = ({ problem, onUpdate, setProblems }) => {
  const [actionLoading, setActionLoading] = useState(false);

  // Toggle solved / unsolved
  const handleToggleStatus = async () => {
    try {
      setActionLoading(true);

      const token = localStorage.getItem("token");

      const newStatus =
        problem.status === "solved" ? "unsolved" : "solved";

      //  Optimistic UI update
      setProblems((prev) =>
        prev.map((item) =>
          item._id === problem._id
            ? { ...item, status: newStatus }
            : item
        )
      );

      // API call
      await API.put(
        `/tracking/${problem._id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Status updated!");

      if (onUpdate) onUpdate();
      
    } catch (error) {
      console.log(
        "Update Error:",
        error.response?.data || error.message
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Delete tracking
  const handleDelete = async () => {
    try {
      setActionLoading(true);

      const token = localStorage.getItem("token");

      // Optimistic UI update
      setProblems((prev) =>
        prev.filter((item) => item._id !== problem._id)
      );

      // API call
      await API.delete(`/tracking/${problem._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (onUpdate) onUpdate();
      toast.success("Problem removed!");

    } catch (error) {
      toast.error("Action failed");
      console.log(
        "Delete Error:",
        error.response?.data || error.message
      );
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg transition">
      
      {/* //left side */}
      
      <h3 className="font-semibold text-lg">
        {problem.problem?.title}
      </h3>

      <p className="text-sm text-gray-500">
        {problem.problem?.difficulty}
      </p>

      <p className="mt-2">
        <span className={`text-xs px-3 py-1 rounded mt-2 inline-block ${
          problem.status === "solved"
          ? "bg-green-100 text-green-600": "bg-yellow-100 text-yellow-600"}`}>
          {problem.status}
        </span>
      </p>
    

      
      <div className="gap-5 mt-3 items-end">
        <button
          onClick={handleToggleStatus}
          disabled={actionLoading}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
        >
          {actionLoading
            ? "Updating..."
            : problem.status === "solved"
            ? "Mark as Unsolved"
            : "Mark as Solved"}
        </button>

        <button
          onClick={handleDelete}
          disabled={actionLoading}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          {actionLoading ? "Removing..." : "Remove"}
        </button>
      </div>

      {problem.problem?.link && (
        <a
          href={problem.problem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm mt-2 inline-block hover:underline"
        >
          Solve Problem →
        </a>
      )}
    </div>
  );
};

export default ProblemCard;