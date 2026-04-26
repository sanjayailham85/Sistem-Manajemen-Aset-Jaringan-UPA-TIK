import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  getAllOsVersion,
  createOsVersion,
  updateOsVersion,
  deleteOsVersion,
} from "../../services/osVersionService";
import usePagination from "../../utils/usePagination";
import usePermission from "../../utils/usePermission";

const OsVersionTable = () => {
  const [osVersions, setOsVersions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const { data, page, totalPages, nextPage, prevPage, loading, refresh } =
    usePagination(getAllOsVersion, 10);
  const { canCreate, canUpdate, canDelete } = usePermission("osversion");

  const [form, setForm] = useState({
    name: "",
    version: "",
  });

  const resetForm = () => {
    setForm({
      name: "",
      version: "",
    });
    setSelectedId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedId) {
        await updateOsVersion(selectedId, form);
      } else {
        await createOsVersion(form);
      }

      refresh();
      resetForm();
    } catch (err) {
      console.error("Failed to save OS Version", err);
    }
  };

  const handleEdit = (item) => {
    setSelectedId(item.id);
    setForm({
      name: item.name,
      version: item.version,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah yakin ingin menghapus OS Version ini?"
    );

    if (!confirmDelete) return;

    try {
      await deleteOsVersion(id);
      refresh();
    } catch (err) {
      console.error("Failed to delete OS Version", err);
    }
  };

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      {/* FORM */}
      <form onSubmit={handleSubmit} className="p-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="OS Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border px-3 py-2 rounded w-56"
        />

        <input
          type="text"
          placeholder="Version"
          value={form.version}
          onChange={(e) => setForm({ ...form, version: e.target.value })}
          className="border px-3 py-2 rounded w-40"
        />

        {canCreate && (
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {selectedId ? "Update" : "+ Tambah"}
          </button>
        )}

        {selectedId && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* TABLE */}
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">OS Name</th>
            <th className="px-4 py-2 text-left">Version</th>

            {(canUpdate || canDelete) && (
              <th className="px-4 py-2 text-center w-28">Aksi</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.version}</td>

              {(canUpdate || canDelete) && (
                <td className="px-4 py-2">
                  <div className="flex justify-center gap-3">
                    {canUpdate && (
                      <button
                        onClick={() => handleEdit(item)}
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
                Tidak ada data OS Version
              </td>
            </tr>
          )}
        </tbody>
      </table>
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

export default OsVersionTable;
