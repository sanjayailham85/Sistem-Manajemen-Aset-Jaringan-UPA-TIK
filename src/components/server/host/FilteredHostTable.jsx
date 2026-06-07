import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllHost,
  createHost,
  updateHost,
  deleteHost,
} from "../../../services/hostService";
import HostModal from "../host/HostModal";
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

const FilteredHostTable = () => {
  const { rackId, physicalId } = useParams();
  const navigate = useNavigate();
  const [hosts, setHost] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedHost, setSelectedHost] = useState(null);
  const { canCreate, canUpdate, canDelete } = usePermission("host");
  const { data, page, totalPages, nextPage, prevPage, loading, refresh } =
    usePagination(getAllHost, 10);
  const { sortedData, handleSort, sortConfig } = useTableSort(data);

  const handleAddHost = async (data) => {
    try {
      await createHost({
        ...data,
        physicalId,
      });
      await refresh();
      setOpenModal(false);
      notifyCreate("Host");
    } catch (err) {
      console.error("Gagal menambah host", err);
      notifyError();
    }
  };

  const handleUpdateHost = async (data) => {
    try {
      await updateHost(selectedHost.id, data);
      refresh();
      setSelectedHost(null);
      setOpenModal(false);
      notifyUpdate("Host");
    } catch (err) {
      console.error("Gagal update host", err);
      notifyError();
    }
  };

  const handleDeleteHost = async (id) => {
    const confirm = window.confirm("Apakah yakin ingin menghapus host ini?");
    if (!confirm) return;

    try {
      await deleteHost(id);
      refresh();
      notifyDelete("Host");
    } catch (err) {
      const code = err?.response?.data?.code;
      if (code === "HOST_NOT_EMPTY") {
        notifyDeleteError("Host");
      } else {
        notifyError();
      }
    }
  };
  const filteredHost = sortedData.filter(
    (host) => host.physicalId === physicalId
  );

  return (
    <div className="bg-white rounded shadow overflow-x-auto pb-4">
      <div className="">
        {canCreate && (
          <button
            onClick={() => {
              setSelectedHost(null);
              setOpenModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded ml-auto block mb-3"
          >
            + Tambah Host
          </button>
        )}
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Host Name</th>
            <th className="px-4 py-2 text-left">IP Address</th>
            <th className="px-4 py-2 text-left">Version</th>
            <th className="px-4 py-2 text-left">Status</th>
            {(canUpdate || canDelete) && (
              <th className="px-4 py-2 text-center w-28">Aksi</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredHost.map((host) => (
            <tr
              onClick={() =>
                navigate(
                  `/racks/${rackId}/physical/${physicalId}/host/${host.id}`
                )
              }
              key={host.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-4 py-2">{host.name}</td>
              <td className="px-4 py-2">{host.ip}</td>
              <td className="px-4 py-2">
                {host.osName} {host.osVersion}
              </td>
              <td
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  host?.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : host?.status === "Inactive"
                    ? "bg-red-100 text-red-700"
                    : host?.status === "Damaged"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {host.status}
              </td>
              {(canUpdate || canDelete) && (
                <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedHost(host);
                        setOpenModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FiEdit size={18} />
                    </button>
                    {canDelete && (
                      <button
                        onClick={() => handleDeleteHost(host.id)}
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

          {filteredHost.length === 0 && (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-500">
                Tidak ada host server
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {openModal && (
        <HostModal
          physicalId={physicalId}
          initialData={selectedHost}
          onClose={() => {
            setOpenModal(false);
            setSelectedHost(null);
          }}
          onSubmit={selectedHost ? handleUpdateHost : handleAddHost}
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

export default FilteredHostTable;
