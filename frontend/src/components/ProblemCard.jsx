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
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="font-semibold">
        {problem.problem?.title}
      </h3>

      <p className="text-sm text-gray-500">
        {problem.problem?.difficulty}
      </p>

      <p className="mt-2">
        Status: <span className="font-medium">{problem.status}</span>
      </p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={handleToggleStatus}
          disabled={actionLoading}
          className="bg-green-500 text-white px-3 py-1 rounded"
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
          className="bg-red-500 text-white px-3 py-1 rounded"
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