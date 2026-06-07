import React from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import usePermission from "../../../utils/usePermission";

const RackCard = ({ rack, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { canCreate, canUpdate, canDelete } = usePermission("rack");

  const handleClick = () => {
    navigate(`/racks/${rack.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer hover:bg-gray-50 bg-white rounded-lg shadow hover:shadow-md transition p-5 border"
    >
      <div className="absolute top-2 right-2 flex gap-2">
        {canUpdate && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(rack);
            }}
            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
          >
            <FiEdit size={18} />
          </button>
        )}
        {canDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(rack.id);
            }}
            className="p-1 text-red-600 hover:bg-red-100 rounded"
          >
            <FiTrash2 size={18} />
          </button>
        )}
      </div>

      <h2 className="text-lg font-semibold mb-1 cursor-pointer">{rack.name}</h2>

      <p className="text-sm text-gray-500 mb-3">{rack.location}</p>
      <p className="text-sm text-gray-500 mb-3">
        Total Physical Server: {rack.total}
      </p>
    </div>
  );
};

export default RackCard;
