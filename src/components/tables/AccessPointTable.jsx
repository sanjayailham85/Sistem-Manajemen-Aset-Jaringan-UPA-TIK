import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getAllAccessPoint,
  createAccessPoint,
  updateAccessPoint,
  deleteAccessPoint,
} from "../../services/accessPointService";
import AccessPointModal from "../digital/accessPoint/AccessPointModal";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import usePermission from "../../utils/usePermission";

const AccessPointTable = () => {
  const [items, setItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const { canCreate, canUpdate, canDelete } = usePermission("accessPoint");

  const fetchData = async () => {
    const res = await getAllAccessPoint();
    setItems(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (data) => {
    await createAccessPoint(data);
    fetchData();
    setOpenModal(false);
  };

  const handleUpdate = async (data) => {
    await updateAccessPoint(selected.id, data);
    fetchData();
    setSelected(null);
    setOpenModal(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus access point?")) return;
    await deleteAccessPoint(id);
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
          + Tambah Access Point
        </button>
      )}

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">IP</th>
            <th className="px-4 py-2 text-left">type</th>
            <th className="px-4 py-2 text-left">location</th>
            {(canUpdate || canDelete) && (
              <th className="px-4 py-2 text-center">Aksi</th>
            )}
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              onClick={() => navigate(`/digital/accessPoint/${item.id}`)}
              key={item.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.ip}</td>
              <td className="px-4 py-2">{item.type}</td>
              <td className="px-4 py-2">{item.location}</td>

              {(canUpdate || canDelete) && (
                <td className="px-4 py-2">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelected(item);
                        setOpenModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FiEdit size={18} />
                    </button>

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

      {openModal && (
        <AccessPointModal
          initialData={selected}
          onClose={() => setOpenModal(false)}
          onSubmit={selected ? handleUpdate : handleAdd}
        />
      )}
    </div>
  );
};

export default AccessPointTable;
