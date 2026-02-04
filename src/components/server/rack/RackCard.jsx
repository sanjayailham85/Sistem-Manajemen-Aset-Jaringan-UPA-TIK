import React from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const RackCard = ({ rack, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/racks/${rack.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer hover:bg-gray-50 bg-white rounded-lg shadow hover:shadow-md transition p-5 border"
    >
      {/* Header Edit/Delete */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation(); // agar tidak memicu navigate
            onEdit(rack);
          }}
          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
        >
          <FiEdit size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(rack.id);
          }}
          className="p-1 text-red-600 hover:bg-red-100 rounded"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      {/* Rack Name */}
      <h2 className="text-lg font-semibold mb-1 cursor-pointer">{rack.name}</h2>

      {/* Location */}
      <p className="text-sm text-gray-500 mb-3">{rack.location}</p>

      {/* Info */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Total Physical Server:{" "}
          <span className="font-medium">{rack.totalServer}</span>
        </span>
        <span className={`text-xs px-2 py-1 rounded`}>{rack.status}</span>
      </div>
    </div>
  );
};

export default RackCard;
