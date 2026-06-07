import React, { useState } from "react";
import SwitchGrid from "../../../components/digital/switch/SwitchGrid";
import SwitchMerkModal from "../../../components/digital/switch/SwitchMerkModal";
import {
  getAll,
  create,
  update,
  deleteSwitchMerk,
} from "../../../services/switchMerkService";
import usePermission from "../../../utils/usePermission";
import usePagination from "../../../utils/usePagination";
import {
  notifyCreate,
  notifyUpdate,
  notifyDelete,
  notifyError,
} from "../../../utils/notifyHelper";

const SwitchMerk = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedSwitch, setSelectedSwitch] = useState(null);

  const { canCreate, canUpdate, canDelete } = usePermission("switchMerk");

  const { data, page, totalPages, nextPage, prevPage, refresh, loading } =
    usePagination(getAll, 9);

  const handleAddSwitch = async (formData) => {
    try {
      await create(formData);
      refresh();
      setOpenModal(false);
      notifyCreate("Switch Merk");
    } catch (err) {
      console.error(err);
      notifyError();
    }
  };

  const handleUpdateSwitch = async (formData) => {
    try {
      await update(selectedSwitch.id, formData);
      refresh();
      setSelectedSwitch(null);
      setOpenModal(false);
      notifyUpdate("Switch Merk");
    } catch (err) {
      console.error(err);
      notifyError();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus Switch Merk?")) return;

    try {
      await deleteSwitchMerk(id);
      refresh();
      notifyDelete("Switch Merk");
    } catch (err) {
      console.error(err);
      notifyError();
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Switch Merk</h1>

        {canCreate && (
          <button
            onClick={() => {
              setSelectedSwitch(null);
              setOpenModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Tambah Switch
          </button>
        )}
      </div>

      {/* GRID */}
      <SwitchGrid
        data={data}
        onEdit={(item) => {
          setSelectedSwitch(item);
          setOpenModal(true);
        }}
        onDelete={handleDelete}
      />

      {/* MODAL */}
      {openModal && (
        <SwitchMerkModal
          initialData={selectedSwitch}
          onClose={() => {
            setOpenModal(false);
            setSelectedSwitch(null);
          }}
          onSubmit={selectedSwitch ? handleUpdateSwitch : handleAddSwitch}
        />
      )}

      {/* PAGINATION */}
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

export default SwitchMerk;
