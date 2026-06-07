import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import usePermission from "../../../utils/usePermission";
import { useNavigate } from "react-router-dom";

const CCTVCard = ({ cctv, onEdit, onDelete }) => {
  const { canUpdate, canDelete } = usePermission("cctvMerk");
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/cctvMerk/${cctv.id}`)}
      className="relative bg-white border rounded-lg shadow hover:shadow-md transition p-5 cursor-pointer"
    >
      {/* ACTION BUTTON */}
      <div className="absolute top-2 right-2 flex gap-2">
        {canUpdate && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(cctv);
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
              onDelete(cctv.id);
            }}
            className="p-1 text-red-600 hover:bg-red-100 rounded"
          >
            <FiTrash2 size={18} />
          </button>
        )}
      </div>

      {/* CONTENT */}
      <h2 className="text-lg font-semibold mb-1">{cctv.name}</h2>

      <p className="text-sm text-gray-500">
        Total Controller: {cctv.totalController}
      </p>
    </div>
  );
};

export default CCTVCard;
