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
import usePermission from "../../../utils/usePermission";
import useTableSort from "../../../utils/useTableSort";
import usePagination from "../../../utils/usePagination.js";
import {
  notifyCreate,
  notifyUpdate,
  notifyDelete,
  notifyDeleteError,
  notifyError,
} from "../../../utils/notifyHelper";

const GuestTable = () => {
  const { rackId, physicalId, hostId } = useParams();
  const navigate = useNavigate();
  const [guests, setGuest] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const { canCreate, canUpdate, canDelete } = usePermission("guest");
  const { data, page, totalPages, nextPage, prevPage, loading, refresh } =
    usePagination(getGuest, 10);
  const { sortedData, handleSort, sortConfig } = useTableSort(data);

  const handleAddGuest = async (data) => {
    try {
      await createGuest({
        ...data,
        hostId,
      });
      await refresh();
      setOpenModal(false);
      notifyCreate("Guest");
    } catch (err) {
      console.error("Gagal menambah host", err);
      notifyError();
    }
  };

  const handleUpdateGuest = async (data) => {
    try {
      await updateGuest(selectedGuest.id, data);
      refresh();
      setSelectedGuest(null);
      setOpenModal(false);
      notifyUpdate("Guest");
    } catch (err) {
      console.error("Gagal update host", err);
      notifyError();
    }
  };

  const handleDeleteGuest = async (id) => {
    const confirm = window.confirm("Apakah yakin ingin menghapus host ini?");
    if (!confirm) return;

    try {
      await deleteGuest(id);
      refresh();
      notifyDelete("Guest");
    } catch (err) {
      const code = err?.response?.data?.code;
      if (code === "GUEST_NOT_EMPTY") {
        notifyDeleteError("Guest");
      } else {
        notifyError();
      }
    }
  };

  const filteredGuest = sortedData.filter((guest) => guest.hostId === hostId);

  return (
    <div className="bg-white rounded shadow overflow-x-auto pb-4">
      <div className="">
        {canCreate && (
          <button
            onClick={() => {
              setSelectedGuest(null);
              setOpenModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded ml-auto block mb-3"
          >
            + Tambah Guest
          </button>
        )}
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Instance Name</th>
            <th className="px-4 py-2 text-left">IP Address</th>
            <th className="px-4 py-2 text-left">OS Version</th>
            <th className="px-4 py-2 text-left">Status</th>
            {(canUpdate || canDelete) && (
              <th className="px-4 py-2 text-center w-28">Aksi</th>
            )}
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
              <td className="px-4 py-2">{guest.name}</td>
              <td className="px-4 py-2">{guest.ip}</td>
              <td className="px-4 py-2">{guest.osVersion}</td>
              <td
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  guest?.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : guest?.status === "Inactive"
                    ? "bg-red-100 text-red-700"
                    : guest?.status === "Damaged"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {guest.status}
              </td>
              {(canUpdate || canDelete) && (
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
                    {canDelete && (
                      <button
                        onClick={() => handleDeleteGuest(guest.id)}
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

export default GuestTable;
