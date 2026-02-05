import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getGuest,
  createGuest,
  updateGuest,
  deleteGuest,
} from "../../../services/guestService";
import GuestModal from "../guest/GuestModal";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const GuestTable = () => {
  const { rackId, physicalId, hostId } = useParams();
  const navigate = useNavigate();
  const [guests, setGuest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const fetchGuest = async () => {
    try {
      setLoading(true);
      const res = await getGuest();

      setGuest(res.data);
    } catch (err) {
      console.error("Gagal mengambil data guest", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGuest = async (data) => {
    try {
      await createGuest({ ...data, hostId });
      fetchGuest();
      setOpenModal(false);
    } catch (err) {
      console.error("Gagal menambah guest", err);
    }
  };

  const handleUpdateGuest = async (data) => {
    try {
      await updateGuest(selectedGuest.id, data);
      fetchGuest();
      setSelectedGuest(null);
      setOpenModal(false);
    } catch (err) {
      console.error("Gagal update guest", err);
    }
  };

  const handleDeleteGuest = async (id) => {
    const confirm = window.confirm("Apakah yakin ingin menghapus guest ini?");
    if (!confirm) return;

    try {
      await deleteGuest(id);
      fetchGuest();
    } catch (err) {
      console.error("Gagal menghapus guest", err);
    }
  };
  const filteredGuest = guests.filter((guest) => guest.hostId === hostId);
  useEffect(() => {
    fetchGuest();
  }, []);

  return (
    <div className="bg-white rounded shadow overflow-x-auto pb-4">
      <div className="">
        <button
          onClick={() => {
            setSelectedGuest(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded ml-auto block mb-3"
        >
          + Tambah Guest
        </button>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Instance Name</th>
            <th className="px-4 py-2 text-left">IP Address</th>
            <th className="px-4 py-2 text-left">OS Version</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-center w-28">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredGuest.map((guest) => (
            <tr
              onClick={() =>
                navigate(
                  `/racks/${rackId}/physical/${physicalId}/host/${hostId}/guest/${guest.id}`
                )
              }
              key={guest.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-4 py-2">{guest.instanceName}</td>
              <td className="px-4 py-2">{guest.ip}</td>
              <td className="px-4 py-2">{guest.osVersion}</td>
              <td className="px-4 py-2 capitalize">{guest.status}</td>
              <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedGuest(guest);
                      setOpenModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FiEdit size={18} />
                  </button>

                  <button
                    onClick={() => handleDeleteGuest(guest.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Hapus"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {filteredGuest.length === 0 && (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-500">
                Tidak ada guest server
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {openModal && (
        <GuestModal
          hostId={hostId}
          initialData={selectedGuest}
          onClose={() => {
            setOpenModal(false);
            setSelectedGuest(null);
          }}
          onSubmit={selectedGuest ? handleUpdateGuest : handleAddGuest}
        />
      )}
    </div>
  );
};

export default GuestTable;
