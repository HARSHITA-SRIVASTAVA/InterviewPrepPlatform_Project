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
    <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all transition duration-300 animate-fadeIn">
      
      {/*left side */}
      
      <h3 className="font-semibold text-lg">
        {problem.problem?.title}
      </h3>

      
      <span className={`text-xs  px-3 py-1 rounded-full inline-block mt-2 ${
        problem.problem?.difficulty === "Easy"? " text-green-700"
        : problem.problem?.difficulty === "Medium"? "text-yellow-700"
        : "text-red-700"
      }`}>
        {problem.problem?.difficulty === "Easy" && "🟢 "}
        {problem.problem?.difficulty === "Medium" && "🟡 "}
        {problem.problem?.difficulty === "Hard" && "🔴 "}
        
        {problem.problem?.difficulty}
      </span>
     

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
          className="bg-green-500 hover:bg-green-600 active:scale-95 text-white px-4 py-1 rounded text-sm transition"
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
          className="bg-red-500 hover:bg-red-600 active:scale-95 text-white px-3 py-1 rounded text-sm transition"
        >
          {actionLoading ? "Removing..." : "Remove"}
        </button>
      </div>

      {/* NOTES */}
      <div>
      <button
        onClick={() => setShowNotes(!showNotes)}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition">
      {showNotes ? "Hide Notes" : "Add Notes"}
      </button>

      {showNotes && (
      <div className="mt-4 p-2 animate-fadeIn">
    
    <textarea
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      rows={6}
      placeholder="Write your interview notes here..."
      className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none bg-white"
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
        className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
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
          className="text-blue-600 text-sm mt-2 inline-block hover:underline hover:translate-x-1 transition"
        >
          Solve Problem →
        </a>
      )}



    </div>
    </>
  );
};

export default ProblemCard;