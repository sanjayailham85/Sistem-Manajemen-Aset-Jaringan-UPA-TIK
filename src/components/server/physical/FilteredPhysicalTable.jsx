import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  getPhysical,
  createPhysical,
  updatePhysical,
  deletePhysical,
} from "../../../services/physicalService";
import PhysicalModal from "./PhysicalModal";

const FilteredPhysicalTable = () => {
  const { rackId } = useParams();
  const navigate = useNavigate();
  const [physicals, setPhysical] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPhysical, setSelectedPhysical] = useState(null);

  const fetchPhysical = async () => {
    try {
      setLoading(true);
      const res = await getPhysical();
      setPhysical(res.data);
    } catch (err) {
      console.error("Gagal mengambil data physical", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ CREATE (FIXED)
  const handleAddPhysical = async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });

      // 🔥 PASTIKAN rackId MASUK

      await createPhysical(formData);

      fetchPhysical();
      setOpenModal(false);
    } catch (err) {
      console.error("Gagal menambah physical", err);
    }
  };

  // ✅ UPDATE (FIXED)
  const handleUpdatePhysical = async (form) => {
    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key !== "imagePreview" && form[key] !== null) {
          formData.append(key, form[key]);
        }
      });

      await updatePhysical(selectedPhysical.id, formData);
      fetchPhysical();
      setSelectedPhysical(null);
      setOpenModal(false);
    } catch (err) {
      console.error("Gagal update physical", err);
    }
  };

  const handleDeletePhysical = async (id) => {
    const confirm = window.confirm(
      "Apakah yakin ingin menghapus physical ini?"
    );
    if (!confirm) return;

    try {
      await deletePhysical(id);
      fetchPhysical();
    } catch (err) {
      console.error("Gagal menghapus physical", err);
    }
  };

  const filteredPhysical = physicals.filter(
    (physical) => physical.rackId === rackId
  );

  useEffect(() => {
    fetchPhysical();
  }, []);

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <div>
        <button
          onClick={() => {
            setSelectedPhysical(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded ml-auto block mb-3"
        >
          + Tambah Physical Server
        </button>
      </div>

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
          {filteredPhysical.map((physical) => (
            <tr
              key={physical.id}
              onClick={() =>
                navigate(`/racks/${physical.rackId}/physical/${physical.id}`, {
                  state: { physical },
                })
              }
              className="border-t hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-4 py-2">{physical.name}</td>
              <td className="px-4 py-2">{physical.ip}</td>
              <td className="px-4 py-2 capitalize">{physical.status}</td>

              <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedPhysical(physical);
                      setOpenModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEdit size={18} />
                  </button>

                  <button
                    onClick={() => handleDeletePhysical(physical.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {filteredPhysical.length === 0 && (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-500">
                Tidak ada physical server
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {openModal && (
        <PhysicalModal
          rackId={rackId}
          initialData={selectedPhysical}
          onClose={() => {
            setOpenModal(false);
            setSelectedPhysical(null);
          }}
          onSubmit={selectedPhysical ? handleUpdatePhysical : handleAddPhysical}
        />
      )}
    </div>
  );
};

export default FilteredPhysicalTable;
