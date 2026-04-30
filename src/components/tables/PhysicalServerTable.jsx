import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  getPhysical,
  createPhysical,
  updatePhysical,
  deletePhysical,
} from "../../services/physicalService";
import PhysicalModal from "../server/physical/PhysicalModal";
import usePermission from "../../utils/usePermission";
import useTableSort from "../../utils/useTableSort";
import usePagination from "../../utils/usePagination";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import {
  notifyCreate,
  notifyUpdate,
  notifyDelete,
  notifyDeleteError,
  notifyError,
} from "../../utils/notifyHelper";
import { exportData } from "../../services/exportService";
import ExportModal from "../../components/ExportModal";
import ImportModal from "../../components/ImportModal";

const PhysicalServerTable = ({ onEdit, onDelete }) => {
  const { rackId, physicalId } = useParams();
  const navigate = useNavigate();
  const [physicals, setPhysical] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPhysical, setSelectedPhysical] = useState(null);
  const { canCreate, canUpdate, canDelete } = usePermission("physical");
  const { data, page, totalPages, nextPage, prevPage, loading, refresh } =
    usePagination(getPhysical, 10);
  const { sortedData, handleSort, sortConfig } = useTableSort(data);
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [selected, setSelected] = useState([]);

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

  const handleExport = async (options) => {
    try {
      const response = await exportData({
        module: "physical",
        format: options.format,
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      const extension = options.format === "excel" ? "xlsx" : "pdf";

      link.download = `physical.${extension}`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      setShowExport(false);
    } catch (error) {
      console.error("Export gagal:", error);
      notifyError("Gagal export Physical Server");
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
    <div className="bg-white rounded shadow overflow-x-auto">
      <div className="m-2">
        <div className="flex justify-end gap-2 p-2">
          {canCreate && (
            <button
              onClick={() => setShowImport(true)}
              className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Import Data
            </button>
          )}
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
              + Tambah Physical
            </button>
          )}
        </div>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th
              onClick={() => handleSort("name")}
              className=" px-4 py-2 text-left cursor-pointer select-none"
            >
              Server Name {renderSortIcon("name")}
            </th>
            <th
              onClick={() => handleSort("ip")}
              className="px-4 py-2 text-left cursor-pointer select-none"
            >
              IP Address {renderSortIcon("ip")}
            </th>
            <th
              onClick={() => handleSort("status")}
              className="px-4 py-2 text-left cursor-pointer select-none"
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
            sortedData.map((physical) => (
              <tr
                key={physical.id}
                onClick={() =>
                  navigate(
                    `/racks/${physical.rackId}/physical/${physical.id}`,
                    {
                      state: { physical },
                    }
                  )
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
                  <td
                    className="px-4 py-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedPhysical(physical);
                          setOpenModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FiEdit size={18} />
                      </button>
                      {canDelete && (
                        <button
                          onClick={() => handleDeletePhysical(physical.id)}
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
      <ExportModal
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        onExport={handleExport}
        title="Export Access Point"
      />

      <ImportModal
        isOpen={showImport}
        onClose={() => setShowImport(false)}
        onImport={refresh}
        module="accessPoint"
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

export default PhysicalServerTable;
