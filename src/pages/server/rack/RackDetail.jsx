import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhysicalServerTable from "../../../components/tables/PhysicalServerTable";
import Breadcrumb from "../../../components/common/Breadcrumb";
import PhysicalModal from "../../../components/server/physical/PhysicalModal";
import {
  getPhysical,
  createPhysical,
  updatePhysical,
  deletePhysical,
} from "../../../services/physicalService";

const RackDetail = () => {
  const { rackId } = useParams();

  const [servers, setServers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedServer, setSelectedServer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rackName, setRackname] = useState([]);

  // 🔹 GET
  const fetchServers = async () => {
    try {
      setLoading(true);
      const res = await getPhysical();

      setServers(res.data);
      const names = res.data.map((item) => item.name);
      setRackname(names);
    } catch (err) {
      console.error("Gagal mengambil data physical server", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 CREATE
  const handleAddServer = async (data) => {
    try {
      await createPhysical({ ...data, rackId });
      fetchServers();
      setOpenModal(false);
    } catch (err) {
      console.error("Gagal menambah physical server", err);
    }
  };

  // 🔹 UPDATE
  const handleUpdateServer = async (data) => {
    try {
      await updatePhysical(selectedServer.id, data);
      fetchServers();
      setSelectedServer(null);
      setOpenModal(false);
    } catch (err) {
      console.error("Gagal update physical server", err);
    }
  };

  // 🔹 DELETE
  const handleDeleteServer = async (id) => {
    const confirm = window.confirm(
      "Apakah yakin ingin menghapus physical server ini?"
    );
    if (!confirm) return;

    try {
      await deletePhysical(id);
      fetchServers();
    } catch (err) {
      console.error("Gagal menghapus physical server", err);
    }
  };

  const filteredPhysical = servers.filter((server) => server.rackId === rackId);
  useEffect(() => {
    fetchServers();
  }, []);

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ label: "Racks", to: "/racks" }, { label: "Physical Server" }]}
      />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Physical Server</h1>
          <p className="text-sm text-gray-500">
            Daftar physical server yang terpasang pada rack ini
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedServer(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Tambah Physical Server
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow p-5">
        {loading ? (
          <p className="text-sm text-gray-500">Memuat data...</p>
        ) : (
          <PhysicalServerTable
            data={filteredPhysical}
            onEdit={(server) => {
              setSelectedServer(server);
              setOpenModal(true);
            }}
            onDelete={handleDeleteServer}
          />
        )}
      </div>

      {/* Modal */}
      {openModal && (
        <PhysicalModal
          rackId={rackId}
          rackName={rackName}
          initialData={selectedServer}
          onClose={() => {
            setOpenModal(false);
            setSelectedServer(null);
          }}
          onSubmit={selectedServer ? handleUpdateServer : handleAddServer}
        />
      )}
    </div>
  );
};

export default RackDetail;
