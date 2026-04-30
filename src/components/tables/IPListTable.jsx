import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { getAll, create, update, deleteIP } from "../../services/ipListService";
import usePagination from "../../utils/usePagination";
import usePermission from "../../utils/usePermission";
import IPListModal from "../../components/digital/IPListModal";
import {
  notifyCreate,
  notifyUpdate,
  notifyDelete,
  notifyDeleteError,
  notifyError,
} from "../../utils/notifyHelper";

const IPListTable = () => {
  const [ipLists, setipLists] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const { data, page, totalPages, nextPage, prevPage, loading, refresh } =
    usePagination(getAll, 10);
  const { canCreate, canUpdate, canDelete } = usePermission("ipList");
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    ip: "",
    lisensi: "",
    is_ssl: "",
    domain: "",
  });

  const handleAdd = async (data) => {
    try {
      await create(data);
      await refresh();
      setOpenModal(false);
      notifyCreate("IP List");
    } catch (err) {
      console.error(err);
      notifyError("Gagal menambah IP List");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await update(selected.id, data);
      await refresh();
      setSelected(null);
      setOpenModal(false);
      notifyUpdate("IP List");
    } catch (err) {
      console.error(err);
      notifyError("Gagal update IP List");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!confirm("Hapus IP List ini?")) return;

      await deleteIP(id);
      await refresh();
      notifyDelete("IP List");
    } catch (err) {
      console.error(err);
      notifyError("Gagal menghapus IP List");
    }
  };

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <div className="flex justify-end gap-2 p-2">
        {canCreate && (
          <button
            onClick={() => {
              setSelected(null);
              setOpenModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            + Tambah IP
          </button>
        )}
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">IP Address</th>
            <th className="px-4 py-2 text-left">Lisensi</th>
            <th className="px-4 py-2 text-left">SSL</th>
            <th className="px-4 py-2 text-left">Domain</th>

            {(canUpdate || canDelete) && (
              <th className="px-4 py-2 text-center w-28">Aksi</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{item.ip}</td>
              <td className="px-4 py-2">{item.lisensi}</td>
              <td className="px-4 py-2">{item.is_ssl}</td>
              <td className="px-4 py-2">{item.domain}</td>

              {(canUpdate || canDelete) && (
                <td className="px-4 py-2">
                  <div className="flex justify-center gap-3">
                    {canUpdate && (
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
                    )}

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

          {data.length === 0 && (
            <tr>
              <td colSpan="3" className="py-4 text-center text-gray-500">
                Tidak ada data IP List
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {openModal && (
        <IPListModal
          initialData={selected}
          onClose={() => setOpenModal(false)}
          onSubmit={selected ? handleUpdate : handleAdd}
        />
      )}
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

export default IPListTable;
