import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getGuest,
  createGuest,
  updateGuest,
  deleteGuest,
} from "../../services/guestService";
import GuestModal from "../server/guest/GuestModal";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import usePermission from "../../utils/usePermission";
import useTableSort from "../../utils/useTableSort";
import usePagination from "../../utils/usePagination";
import {
  notifyCreate,
  notifyUpdate,
  notifyDelete,
  notifyDeleteError,
  notifyError,
} from "../../utils/notifyHelper";
import { exportData } from "../../services/exportService";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import ExportModal from "../../components/ExportModal";
import ImportModal from "../../components/ImportModal";

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
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleAddGuest = async (data) => {
    try {
      await createGuest(data);
      refresh();
      setOpenModal(false);
      notifyCreate("Guest");
    } catch (err) {
      console.error("Gagal menambah guest", err);
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
      console.error("Gagal update guest", err);
      notifyError();
    }
  };

  const handleDeleteGuest = async (id) => {
    const confirm = window.confirm("Apakah yakin ingin menghapus guest ini?");
    if (!confirm) return;

    try {
      await deleteGuest(id);
      refresh();
      notifyDelete("Guest");
    } catch (err) {
      console.error("Gagal menghapus guest", err);
      notifyError();
    }
  };

  const handleExport = async (options) => {
    try {
      const response = await exportData({
        module: "guest",
        format: options.format,
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      const extension = options.format === "excel" ? "xlsx" : "pdf";

      link.download = `guest.${extension}`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      setShowExport(false);
    } catch (error) {
      console.error("Export gagal:", error);
      notifyError("Gagal export Guest");
    }
  };

  const renderSortIcon = (key) => {
    return (
      <span className="inline-flex w-4 justify-center">
        {sortConfig.key === key &&
          (sortConfig.direction === "asc" ? (
            <FiChevronUp />
          ) : (
            <FiChevronDown />
          ))}
      </span>
    );
  };

  return (
    <div className="bg-white rounded shadow overflow-x-auto pb-4">
      <div className="flex justify-end gap-2 p-2">
        <button
          onClick={() => setShowImport(true)}
          className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Import Data
        </button>

        <button
          onClick={() => setShowExport(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Export Data
        </button>

        {canCreate && (
          <button
            onClick={() => {
              setSelected(null);
              setOpenModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            + Tambah Guest
          </button>
        )}
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th
              onClick={() => handleSort("name")}
              className=" px-4 py-2 text-left cursor-pointer select-none"
            >
              Instance Name {renderSortIcon("name")}
            </th>
            <th
              onClick={() => handleSort("ip")}
              className=" px-4 py-2 text-left cursor-pointer select-none"
            >
              IP Address {renderSortIcon("ip")}
            </th>
            <th
              onClick={() => handleSort("osVersion")}
              className=" px-4 py-2 text-left cursor-pointer select-none"
            >
              OS Version {renderSortIcon("osVersion")}
            </th>
            <th
              onClick={() => handleSort("status")}
              className=" px-4 py-2 text-left cursor-pointer select-none"
            >
              Status {renderSortIcon("status")}
            </th>

            {(canUpdate || canDelete) && (
              <th className="px-4 py-2 text-center w-28">Aksi</th>
            )}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="py-10">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-500">
                    Loading devices...
                  </span>
                </div>
              </td>
            </tr>
          ) : sortedData.length > 0 ? (
            sortedData.map((guest) => (
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
                <td className="px-4 py-2">
                  {guest.osName} {guest.osVersion}
                </td>{" "}
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
                  <td
                    className="px-4 py-2"
                    onClick={(e) => e.stopPropagation()}
                  >
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
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-400">
                No data found
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
      <ExportModal
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        onExport={handleExport}
        title="Export Guest"
      />

      <ImportModal
        isOpen={showImport}
        onClose={() => setShowImport(false)}
        onImport={refresh}
        module="guest"
      />
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
