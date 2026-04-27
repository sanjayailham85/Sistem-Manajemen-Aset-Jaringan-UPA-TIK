import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllAccessPoint,
  createAccessPoint,
  updateAccessPoint,
  deleteAccessPoint,
} from "../../services/accessPointService";
import AccessPointModal from "../digital/accessPoint/AccessPointModal";
import ExportModal from "../../components/ExportModal";
import ImportModal from "../../components/ImportModal";
import { FiEdit, FiTrash2, FiChevronUp, FiChevronDown } from "react-icons/fi";
import usePermission from "../../utils/usePermission";
import useTableSort from "../../utils/useTableSort";
import usePagination from "../../utils/usePagination";

import {
  notifyCreate,
  notifyUpdate,
  notifyDelete,
  notifyError,
} from "../../utils/notifyHelper";

import { exportData } from "../../services/exportService";

const AccessPointTable = () => {
  const navigate = useNavigate();
  const { canCreate, canUpdate, canDelete } = usePermission("accessPoint");
  const { data, page, totalPages, nextPage, prevPage, refresh, loading } =
    usePagination(getAllAccessPoint, 10);
  const { sortedData, handleSort, sortConfig } = useTableSort(data);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);

  const handleAdd = async (data) => {
    try {
      await createAccessPoint(data);
      await refresh();
      setOpenModal(false);
      notifyCreate("Access Point");
    } catch (err) {
      console.error(err);
      notifyError("Gagal menambah Access Point");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateAccessPoint(selected.id, data);
      await refresh();
      setSelected(null);
      setOpenModal(false);
      notifyUpdate("Access Point");
    } catch (err) {
      console.error(err);
      notifyError("Gagal update Access Point");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!confirm("Hapus access point ini?")) return;

      await deleteAccessPoint(id);
      await refresh();
      notifyDelete("Access Point");
    } catch (err) {
      console.error(err);
      notifyError("Gagal menghapus Access Point");
    }
  };

  const handleExport = async (options) => {
    try {
      const response = await exportData({
        module: "accessPoint",
        format: options.format,
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      const extension = options.format === "excel" ? "xlsx" : "pdf";

      link.download = `accessPoint.${extension}`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      setShowExport(false);
    } catch (error) {
      console.error("Export gagal:", error);
      notifyError("Gagal export Access Point");
    }
  };

  const renderSortIcon = (key) => (
    <span className="inline-flex w-4 justify-center">
      {sortConfig.key === key &&
        (sortConfig.direction === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
    </span>
  );

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
            + Tambah Access Point
          </button>
        )}
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th
              onClick={() => handleSort("name")}
              className="px-4 py-2 text-left cursor-pointer"
            >
              Name {renderSortIcon("name")}
            </th>

            <th
              onClick={() => handleSort("ip")}
              className="px-4 py-2 text-left cursor-pointer"
            >
              IP {renderSortIcon("ip")}
            </th>

            <th
              onClick={() => handleSort("type")}
              className="px-4 py-2 text-left cursor-pointer"
            >
              Type {renderSortIcon("type")}
            </th>

            <th
              onClick={() => handleSort("location")}
              className="px-4 py-2 text-left cursor-pointer"
            >
              Location {renderSortIcon("location")}
            </th>

            {(canUpdate || canDelete) && (
              <th className="px-4 py-2 text-center">Aksi</th>
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
            sortedData.map((item) => (
              <tr
                key={item.id}
                onClick={() => navigate(`/digital/accessPoint/${item.id}`)}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.ip}</td>
                <td className="px-4 py-2">{item.type}</td>
                <td className="px-4 py-2">{item.location}</td>

                {(canUpdate || canDelete) && (
                  <td
                    className="px-4 py-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setSelected(item);
                          setOpenModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit size={18} />
                      </button>

                      {canDelete && (
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
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
        <AccessPointModal
          initialData={selected}
          onClose={() => setOpenModal(false)}
          onSubmit={selected ? handleUpdate : handleAdd}
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

export default AccessPointTable;
