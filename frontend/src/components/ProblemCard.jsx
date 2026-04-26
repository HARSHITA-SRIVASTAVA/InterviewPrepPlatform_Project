const ProblemCard = ({ problem }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full">
      
      {/* Title */}
      <h3 className="font-semibold text-lg">
        {problem.problem?.title}
      </h3>

      {/* Difficulty */}
      <p className="text-sm text-gray-500">
        {problem.problem?.difficulty}
      </p>

      {/* Status */}
      <p className="text-sm mt-1">
        Status: {problem.status}
      </p>

      {/*Problem Link */}
      {problem.problem?.link && (
        <a
          href={problem.problem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-blue-600 text-sm font-medium hover:underline"
        >
          Solve or View Problem →
        </a>
      )}
    </div>
  );
};

export default ProblemCard;