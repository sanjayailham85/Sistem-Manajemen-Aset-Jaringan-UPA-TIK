import React from "react";
import { getAll, deleteActivityLogs } from "../../services/activityLogService";
import { FiTrash2 } from "react-icons/fi";
import usePermission from "../../utils/usePermission";
import usePagination from "../../utils/usePagination";

const ActivityLogsTable = () => {
  const { canUpdate, canDelete } = usePermission("activityLogs");

  const { data, page, totalPages, nextPage, prevPage, loading, refresh } =
    usePagination(getAll, 10);

  const handleDelete = async (id) => {
    if (!confirm("Hapus Activity Log?")) return;
    await deleteActivityLogs(id);
    refresh();
  };
  const formatDateTime = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Created At</th>

              {(canUpdate || canDelete) && (
                <th className="px-4 py-2 text-center">Aksi</th>
              )}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-10 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    {/* spinner lebih besar */}
                    <div className="w-8 h-8 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

                    <span className="text-sm text-gray-500">
                      Loading logs...
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {`${item.name} ${item.description}`}
                  </td>
                  <td className="px-4 py-2">
                    {formatDateTime(item.createdAt)}{" "}
                  </td>

                  {(canUpdate || canDelete) && (
                    <td
                      className="px-4 py-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-center gap-3">
                        {canDelete && (
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Hapus"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION (DI LUAR TABLE) */}
      <div className="flex justify-between items-center px-4 py-3 border-t bg-gray-50">
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogsTable;
