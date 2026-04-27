import API from "../api/axios";

const ProblemCard = ({ problem, onUpdate }) => {

  const handleToggle = async () => {  //marking solved and unsolved
    try {
      const token = localStorage.getItem("token");

      const newStatus =
        problem.status === "solved" ? "unsolved" : "solved";

      const res = await API.put(
        `/tracking/${problem._id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Updated:", res.data);

      //  refresh UI
      onUpdate();

    } catch (error) {
      console.log(
        "Update Error:",
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.delete( `/tracking/${problem._id}`,   //dynamic URL
      { headers: {Authorization: `Bearer ${token}`,},}          //verification
    );

    console.log("Deleted:", res.data);

    //refresh UI
    onUpdate();

  } catch (error) {
    console.log(
      "Delete Error:",
      error.response?.data || error.message
    );
  }
};

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full">
      
      <h3 className="font-semibold text-lg">
        {problem.problem?.title}
      </h3>

      <p className="text-sm text-gray-500">
        {problem.problem?.difficulty}
      </p>

      <p className="text-sm mt-1">
        Status: {problem.status}
      </p>

      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className="mt-3 bg-green-600 text-white px-3 py-1 rounded text-sm"
      >
        Mark as {problem.status === "solved" ? "Unsolved" : "Solved"}
      </button>

      <button
        onClick={handleDelete}
        className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm">
        Remove
      </button>

      {/* Link */}
      {problem.problem?.link && (
        <a
          href={problem.problem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 text-blue-600 text-sm hover:underline"
        >
          Solve Problem →
        </a>
      )}
    </div>
  );
};

export default ProblemCard;