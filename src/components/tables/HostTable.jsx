import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getHost,
  createHost,
  updateHost,
  deleteHost,
} from "../../services/hostService";
import HostModal from "../server/host/HostModal";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import usePermission from "../../utils/usePermission";
import useTableSort from "../../utils/useTableSort";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const HostTable = () => {
  const { rackId, physicalId } = useParams();
  const navigate = useNavigate();
  const [hosts, setHost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedHost, setSelectedHost] = useState(null);
  const { canCreate, canUpdate, canDelete } = usePermission("host");
  const { sortedData, handleSort, sortConfig } = useTableSort(hosts);

  const fetchHost = async () => {
    try {
      setLoading(true);
      const res = await getHost();
      console.log(res.data);

      setHost(res.data);
    } catch (err) {
      console.error("Gagal mengambil data host", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHost = async (data) => {
    try {
      await createHost(data);
      fetchHost();
      setOpenModal(false);
    } catch (err) {
      console.error("Gagal menambah host", err);
    }
  };

  // 🔹 UPDATE
  const handleUpdateHost = async (data) => {
    try {
      await updateHost(selectedHost.id, data);
      fetchHost();
      setSelectedHost(null);
      setOpenModal(false);
    } catch (err) {
      console.error("Gagal update host", err);
    }
  };

  // 🔹 DELETE
  const handleDeleteHost = async (id) => {
    const confirm = window.confirm("Apakah yakin ingin menghapus host ini?");
    if (!confirm) return;

    try {
      await deleteHost(id);
      fetchHost();
    } catch (err) {
      console.error("Gagal menghapus host", err);
    }
  };
  useEffect(() => {
    fetchHost();
  }, []);

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
      <div className="m-2">
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
            <th
              onClick={() => handleSort("name")}
              className=" px-4 py-2 text-left cursor-pointer select-none"
            >
              Host Name {renderSortIcon("name")}
            </th>
            <th
              onClick={() => handleSort("ip")}
              className=" px-4 py-2 text-left cursor-pointer select-none"
            >
              IP Address {renderSortIcon("ip")}
            </th>
            <th
              onClick={() => handleSort("version")}
              className=" px-4 py-2 text-left cursor-pointer select-none"
            >
              Version {renderSortIcon("version")}
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
          {sortedData.map((host) => (
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

          {hosts.length === 0 && (
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
    </div>
  );
};

export default HostTable;
