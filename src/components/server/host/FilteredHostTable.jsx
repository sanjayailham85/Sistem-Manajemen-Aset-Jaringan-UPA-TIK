import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getHost,
  createHost,
  updateHost,
  deleteHost,
} from "../../../services/hostService";
import HostModal from "../host/HostModal";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const HostTable = () => {
  const { rackId, physicalId } = useParams();
  const navigate = useNavigate();
  const [hosts, setHost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedHost, setSelectedHost] = useState(null);

  const fetchHost = async () => {
    try {
      setLoading(true);
      const res = await getHost();

      setHost(res.data);
    } catch (err) {
      console.error("Gagal mengambil data host", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHost = async (data) => {
    try {
      await createHost({ ...data, physicalId });
      fetchHost();
      setOpenModal(false);
    } catch (err) {
      console.error("Gagal menambah host", err);
    }
  };

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
  const filteredHost = hosts.filter((host) => host.physicalId === physicalId);
  useEffect(() => {
    fetchHost();
  }, []);

  return (
    <div className="bg-white rounded shadow overflow-x-auto pb-4">
      <div className="">
        <button
          onClick={() => {
            setSelectedHost(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded ml-auto block mb-3"
        >
          + Tambah Host
        </button>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Host Name</th>
            <th className="px-4 py-2 text-left">IP Address</th>
            <th className="px-4 py-2 text-left">Version</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-center w-28">Aksi</th>
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
              <td className="px-4 py-2">{host.version}</td>
              <td className="px-4 py-2 capitalize">{host.status}</td>
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

                  <button
                    onClick={() => handleDeleteHost(host.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Hapus"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </td>
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
    </div>
  );
};

export default HostTable;
