import React, { useEffect, useState } from "react";
import RackGrid from "../../../components/server/rack/RackGrid";
import RackModal from "../../../components/server/rack/RackModal";
import {
  getRacks,
  createRack,
  updateRack,
  deleteRack,
} from "../../../services/rackService";

import { getPhysical } from "../../../services/physicalService";

const RackList = () => {
  const [racks, setRacks] = useState([]);
  const [physicalServers, setPhysicalServers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRack, setSelectedRack] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRacks = async () => {
    try {
      setLoading(true);
      const res = await getRacks();
      setRacks(res.data);
    } catch (err) {
      console.error("Gagal mengambil data racks", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPhysicalServers = async () => {
    try {
      const res = await getPhysical();
      setPhysicalServers(res.data);
    } catch (err) {
      console.error("Gagal mengambil data physical server", err);
    }
  };

  useEffect(() => {
    fetchRacks();
    fetchPhysicalServers(); // ambil data physical server
  }, []);

  const handleAddRack = async (data) => {
    try {
      await createRack({ ...data });
      fetchRacks();
      setOpenModal(false);
    } catch (err) {
      console.error("Gagal menambah data racks", err);
    }
  };
  const handleUpdateRack = async (data) => {
    try {
      await updateRack(selectedRack.id, data);
      fetchRacks();
      setSelectedRack(null);
      setOpenModal(false);
    } catch (err) {
      console.error("Gagal update data rack ", err);
    }
  };

  const handleDeleteRack = async (id) => {
    const confirm = window.confirm("Apakah yakin ingin menghapus rack ini?");
    if (!confirm) return;

    try {
      await deleteRack(id);
      setRacks((prev) => prev.filter((rack) => rack.id !== id));
    } catch (err) {
      console.error("Gagal menghapus rack", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Rack Server</h1>
        <button
          onClick={() => {
            setSelectedRack(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Tambah Rack
        </button>
      </div>

      <RackGrid
        racks={racks.map((rack) => {
          const totalServer = physicalServers.filter(
            (s) => s.rackId === rack.id
          ).length;
          return { ...rack, totalServer };
        })}
        onEdit={(rack) => {
          setSelectedRack(rack);
          setOpenModal(true);
        }}
        onDelete={handleDeleteRack}
      />
      {/* Modal */}
      {openModal && (
        <RackModal
          // rackNumber={rackId}
          initialData={selectedRack}
          onClose={() => {
            setOpenModal(false);
            setSelectedRack(null);
          }}
          onSubmit={selectedRack ? handleUpdateRack : handleAddRack}
        />
      )}
    </div>
  );
};

export default RackList;
