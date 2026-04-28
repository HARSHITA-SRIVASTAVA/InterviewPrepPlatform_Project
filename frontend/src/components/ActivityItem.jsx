import React from "react";

const ActivityItem = ({ activity }) => {
  if (!activity) return null;

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm">
      
      {/* Problem Title */}
      <h4 className="font-medium">
        {activity.problem?.title || "Unknown Problem"}
      </h4>

      {/* Difficulty */}
      <p className="text-sm text-gray-500">
        {activity.problem?.difficulty || "N/A"}
      </p>

      {/* STATUS INSTEAD OF ACTION */}
      <p className="text-sm mt-1">
        Status:{" "}
        <span
          className={`font-medium ${
            activity.status === "solved"
              ? "text-green-600"
              : "text-yellow-600"
          }`}
        >
          {activity.status || "N/A"}
        </span>
      </p>

      {/* Timestamp */}
      <p className="text-xs text-gray-400 mt-1">
        {activity.createdAt
          ? new Date(activity.createdAt).toLocaleString()
          : ""}
      </p>
    </div>
  );
};

export default ActivityItem;