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
const FilteredPhysicalTable = () => {
  const { rackId } = useParams();
  const navigate = useNavigate();
  const [physicals, setPhysical] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPhysical, setSelectedPhysical] = useState(null);
  const { canCreate, canUpdate, canDelete } = usePermission("physical");
  const { data, page, totalPages, nextPage, prevPage, loading, refresh } =
    usePagination(getPhysical, 10);
  const { sortedData, handleSort, sortConfig } = useTableSort(data);

  const handleAddPhysical = async (data) => {
    try {
      await createPhysical(data);
      refresh();
      setOpenModal(false);
      notifyCreate("Physical");
    } catch (err) {
      console.error("Gagal menambah physical", err);
      notifyError();
    }
  };

  const handleUpdatePhysical = async (data) => {
    try {
      await updatePhysical(selectedPhysical.id, data);
      refresh();
      setSelectedPhysical(null);
      setOpenModal(false);
      notifyUpdate("Physical");
    } catch (err) {
      console.error("Gagal update physical", err);
      notifyError();
    }
  };

  const handleDeletePhysical = async (id) => {
    const confirm = window.confirm(
      "Apakah yakin ingin menghapus physical ini?"
    );
    if (!confirm) return;

    try {
      await deletePhysical(id);
      refresh();
      notifyDelete("Physical");
    } catch (err) {
      const code = err?.response?.data?.code;
      if (code === "PHYSICAL_NOT_EMPTY") {
        notifyDeleteError("Physical");
      } else {
        notifyError();
      }
    }
  };

  const filteredPhysical = sortedData.filter(
    (physical) => physical.rackId === rackId
  );

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <div>
        {canCreate && (
          <button
            onClick={() => {
              setSelectedPhysical(null);
              setOpenModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded ml-auto block mb-3"
          >
            + Tambah Physical Server
          </button>
        )}
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Physical Server Name</th>
            <th className="px-4 py-2 text-left">IP Address</th>
            <th className="px-4 py-2 text-left">Status</th>
            {(canUpdate || canDelete) && (
              <th className="px-4 py-2 text-center w-28">Aksi</th>
            )}
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
              <td
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  physical?.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : physical?.status === "Inactive"
                    ? "bg-red-100 text-red-700"
                    : physical?.status === "Damaged"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {physical.status}
              </td>
              {(canUpdate || canDelete) && (
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
                    {canDelete && (
                      <button
                        onClick={() => handleDeletePhysical(physical.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    )}
                  </div>
                </td>
              )}
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

export default FilteredPhysicalTable;
