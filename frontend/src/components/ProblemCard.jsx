import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

const ProblemCard = ({ problem, onUpdate, setProblems }) => {
  const [actionLoading, setActionLoading] = useState(false);

  const [notes, setNotes] = useState(problem.notes || "");
  const [showNotes, setShowNotes] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);

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

  //save function
  const handleSaveNotes = async () => {
  try {
    setSavingNotes(true);

    const token = localStorage.getItem("token");

    await API.put(
      `/tracking/${problem._id}`,
      { notes },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Notes saved!");

    // if (onUpdate) onUpdate();
    setShowNotes(false);
    
    if(onUpdate){
     onUpdate();
    }

    } catch (error) {
      toast.error("Failed to save notes");
      console.log(error);
    } finally {
      setActionLoading(false);
      setSavingNotes(false);
    }
  };

  return (
    <>
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 hover:-translate-y-1 transition-all transition duration-300 animate-fadeIn">
      
      {/*left side */}
      <div className="flex justify-between items-start mb-4">
      
        <h3 className="font-bold text-xl text-gray-800">
          {problem.problem?.title}
        </h3>

      </div>

      
      <span className={`text-sm  px-3 py-1 rounded-2xl inline-block mt-2 font-medium ${
        problem.problem?.difficulty === "Easy"? "bg-green-100 text-green-700"
        : problem.problem?.difficulty === "Medium"? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
      }`}>
        {problem.problem?.difficulty === "Easy" && "🟢 "}
        {problem.problem?.difficulty === "Medium" && "🟡 "}
        {problem.problem?.difficulty === "Hard" && "🔴 "}
        
        {problem.problem?.difficulty}
      </span>
     

      <p className="lg:ml-2 mt-2  inline-block ">
        <span className={`text-sm  px-3 py-1 rounded-2xl mt-2 font-medium ${
          problem.status === "solved"
          ? "bg-green-100 text-green-700": "bg-orange-100 text-orange-700"}`}>
          {problem.status}
        </span>
      </p>

      <div className="text-sm text-gray-500 space-y-2 mb-5 mt-4">
        <p>
          📅 {new Date(problem.createdAt).toLocaleDateString()}
        </p>
        <p>
          🏷️ {problem.problem.tags?.slice(0,2).join(", ")}
        </p>
      </div>

      <div className="gap-5 mt-3 items-end">
        <button
          onClick={handleToggleStatus}
          disabled={actionLoading}
          className="px-4 py-1 rounded-xl border border-green-500 text-green-600 hover:bg-green-50 text-sm transition"
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
          className="lg:ml-1  px-4 py-1 rounded-xl border border-red-500 text-red-600 hover:bg-red-50 text-sm transition"
        >
          {actionLoading ? "Removing..." : "Remove"}
        </button>
      </div>

      {/* NOTES */}
      <div>
      <button
        onClick={() => setShowNotes(!showNotes)}
        className="mt-2 px-4 py-1 rounded-xl border border-purple-500 text-purple-600 hover:bg-purple-50">
      {showNotes ? "Hide Notes" : "Add Notes"}
      </button>

      {showNotes && (
      <div className="mt-4 p-2 animate-fadeIn">
    
    <textarea
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      rows={6}
      placeholder="Write your interview notes here..."
      className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none bg-white"
    />

    <div className="flex justify-end gap-3 mt-3">
      
      <button
        onClick={() => setShowNotes(false)}
        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
      >
        Cancel
      </button>

      <button
        onClick={handleSaveNotes}
        disabled={savingNotes}
        className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white"
      >
        {savingNotes ? "Saving..." : "Save Notes"}
      </button>

    </div>
    </div>
    )}
    </div>

      {problem.problem?.link && (
        <a
          href={problem.problem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 text-medium mt-2 inline-block hover:underline hover:translate-x-1 transition"
        >
          Solve Problem →
        </a>
      )}



    </div>
    </>
  );
};

export default ProblemCard;