import React, { useEffect, useState } from "react";
import RackGrid from "../../../components/server/rack/RackGrid";
import RackModal from "../../../components/server/rack/RackModal";
import {
  getRacks,
  createRack,
  updateRack,
  deleteRack,
} from "../../../services/rackService";
import usePermission from "../../../utils/usePermission";
import usePagination from "../../../utils/usePagination";
import {
  notifyCreate,
  notifyUpdate,
  notifyDelete,
  notifyDeleteError,
  notifyError,
} from "../../../utils/notifyHelper";

const RackList = () => {
  const [racks, setRacks] = useState([]);
  const [physicalServers, setPhysicalServers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRack, setSelectedRack] = useState(null);
  const { canCreate, canUpdate, canDelete } = usePermission("rack");
  const { data, page, totalPages, nextPage, prevPage, loading, refresh } =
    usePagination(getRacks, 9);

  const handleAddRack = async (data) => {
    try {
      await createRack({ ...data });
      refresh();
      setOpenModal(false);
      notifyCreate("Rack");
    } catch (err) {
      console.error("Gagal menambah data racks", err);
      notifyError();
    }
  };
  const handleUpdateRack = async (data) => {
    try {
      await updateRack(selectedRack.id, data);
      refresh();
      setSelectedRack(null);
      setOpenModal(false);
      notifyUpdate("Rack");
    } catch (err) {
      console.error("Gagal update data rack ", err);
      notifyError();
    }
  };

  const handleDeleteRack = async (id) => {
    const confirm = window.confirm("Apakah yakin ingin menghapus rack ini?");
    if (!confirm) return;

    try {
      await deleteRack(id);
      setRacks((prev) => prev.filter((rack) => rack.id !== id));
      refresh();
      notifyDelete("Rack");
    } catch (err) {
      const code = err?.response?.data?.code;

      if (code === "RACK_NOT_EMPTY") {
        notifyDeleteError("Rack");
      } else {
        notifyError();
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <span className="text-sm text-gray-500">Loading racks...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Rack Server</h1>
        {canCreate && (
          <button
            onClick={() => {
              setSelectedRack(null);
              setOpenModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Tambah Rack
          </button>
        )}
      </div>

      <RackGrid
        data={data.map((rack) => {
          return { rack };
        })}
        onEdit={(rack) => {
          setSelectedRack(rack);
          setOpenModal(true);
        }}
        onDelete={handleDeleteRack}
      />
      {openModal && (
        <RackModal
          initialData={selectedRack}
          onClose={() => {
            setOpenModal(false);
            setSelectedRack(null);
          }}
          onSubmit={selectedRack ? handleUpdateRack : handleAddRack}
          onSuccess={refresh}
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

export default RackList;
