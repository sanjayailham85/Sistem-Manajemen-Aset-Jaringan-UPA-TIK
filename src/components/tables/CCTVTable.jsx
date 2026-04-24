import React, { useEffect, useState } from "react";
import {
  getAllCCTV,
  createCCTV,
  updateCCTV,
  deleteCCTV,
} from "../../services/cctvService";
import CCTVModal from "../digital/cctv/CCTVModal";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import usePermission from "../../utils/usePermission";

const CCTVTable = () => {
  const [items, setItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const { canCreate, canUpdate, canDelete } = usePermission("CCTV");

  const fetchData = async () => {
    const res = await getAllCCTV();
    setItems(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (data) => {
    await createCCTV(data);
    fetchData();
    setOpenModal(false);
  };

  const handleUpdate = async (data) => {
    await updateCCTV(selected.id, data);
    fetchData();
    setSelected(null);
    setOpenModal(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus CCTV?")) return;
    await deleteCCTV(id);
    fetchData();
  };

  return (
    <div className="bg-white rounded shadow overflow-x-auto pb-4">
      {canCreate && (
        <button
          onClick={() => {
            setSelected(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded ml-auto block m-2"
        >
          + Tambah CCTV
        </button>
      )}

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">IP</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Status</th>
            {(canUpdate || canDelete) && (
              <th className="px-4 py-2 text-center">Aksi</th>
            )}
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.ip}</td>
              <td className="px-4 py-2">{item.type}</td>
              <td
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  item?.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : item?.status === "Inactive"
                    ? "bg-red-100 text-red-700"
                    : item?.status === "Damaged"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {item.status}
              </td>

              {(canUpdate || canDelete) && (
                <td className="px-4 py-2">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelected(item);
                        setOpenModal(true);
                      }}
                      className="text-blue-600"
                    >
                      <FiEdit size={18} />
                    </button>

                    {canDelete && (
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600"
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

      {openModal && (
        <CCTVModal
          initialData={selected}
          onClose={() => setOpenModal(false)}
          onSubmit={selected ? handleUpdate : handleAdd}
        />
      )}
    </div>
  );
};

export default CCTVTable;
