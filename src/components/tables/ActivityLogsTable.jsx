import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAll } from "../../services/activityLogService";
import { FiTrash2 } from "react-icons/fi";
import usePermission from "../../utils/usePermission";

const ActivityLogsTable = () => {
  const [items, setItems] = useState([]);
  const { canCreate, canUpdate, canDelete } = usePermission("activityLogs");

  const fetchData = async () => {
    const res = await getAll();

    setItems(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded shadow overflow-x-auto pb-4">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className=" px-4 py-2 text-left cursor-pointer select-none">
              Description
            </th>

            {(canUpdate || canDelete) && (
              <th className="px-4 py-2 text-center">Aksi</th>
            )}
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-4 py-2">{`${item.name} ${item.description}`}</td>

              {(canUpdate || canDelete) && (
                <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityLogsTable;
