import React from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const PhysicalServerTable = ({ data, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Nama Server</th>
            <th className="px-4 py-2 text-left">IP Address</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-center w-28">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((server) => (
            <tr
              key={server.id}
              onClick={() =>
                navigate(`/racks/${server.rackId}/physical/${server.id}`, {
                  state: { server },
                })
              }
              className="border-t hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-4 py-2">{server.name}</td>
              <td className="px-4 py-2">{server.ip}</td>
              <td className="px-4 py-2 capitalize">{server.status}</td>

              {/* 🔹 Aksi */}
              <td
                className="px-4 py-2"
                onClick={(e) => e.stopPropagation()} // ⛔
              >
                <div className="flex justify-center gap-3">
                  {/* Edit */}
                  <button
                    onClick={() => onEdit(server)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FiEdit size={18} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => onDelete(server.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Hapus"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-500">
                Tidak ada physical server
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PhysicalServerTable;
