import React from "react";

const RackCard = ({ rack, onClick }) => {
  const statusColor =
    rack.status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-lg shadow hover:shadow-md transition p-5 border"
    >
      {/* Rack Name */}
      <h2 className="text-lg font-semibold mb-1">
        {rack.name}
      </h2>

      {/* Location */}
      <p className="text-sm text-gray-500 mb-3">
        {rack.location}
      </p>

      {/* Info */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Total Server:{" "}
          <span className="font-medium">
            {rack.totalServer}
          </span>
        </span>

        <span
          className={`text-xs px-2 py-1 rounded ${statusColor}`}
        >
          {rack.status}
        </span>
      </div>
    </div>
  );
};

export default RackCard;
