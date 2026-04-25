import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  getAllOsVersion,
  createOsVersion,
  updateOsVersion,
  deleteOsVersion,
} from "../../services/optionService";
import usePermission from "../../utils/usePermission";

const OsVersionTable = () => {
  const [osVersions, setOsVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    version: "",
  });

  const { canCreate, canUpdate, canDelete } = usePermission("osversion");

  const fetchOsVersion = async () => {
    try {
      setLoading(true);
      const res = await getAllOsVersion();
      setOsVersions(res.data);
    } catch (err) {
      console.error("Failed to fetch OS Version", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOsVersion();
  }, []);

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

      fetchOsVersion();
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
      fetchOsVersion();
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
          {osVersions.map((item) => (
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

          {osVersions.length === 0 && (
            <tr>
              <td colSpan="3" className="py-4 text-center text-gray-500">
                Tidak ada data OS Version
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OsVersionTable;
