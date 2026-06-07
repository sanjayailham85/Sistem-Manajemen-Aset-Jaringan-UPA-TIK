import React, { useState } from "react";
import CCTVGrid from "../../../components/digital/cctv/CCTVGrid";
import CCTVMerkModal from "../../../components/digital/cctv/CCTVMerkModal";
import {
  getAll,
  create,
  update,
  deleteCCTVMerk,
} from "../../../services/cctvMerkService";
import usePermission from "../../../utils/usePermission";
import usePagination from "../../../utils/usePagination";
import {
  notifyCreate,
  notifyUpdate,
  notifyDelete,
  notifyError,
} from "../../../utils/notifyHelper";

const CCTVMerk = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCCTV, setSelectedCCTV] = useState(null);

  const { canCreate, canUpdate, canDelete } = usePermission("cctvMerk");

  const { data, page, totalPages, nextPage, prevPage, refresh, loading } =
    usePagination(getAll, 9);

  const handleAddCCTV = async (formData) => {
    try {
      await create(formData);
      refresh();
      setOpenModal(false);
      notifyCreate("CCTV Merk");
    } catch (err) {
      console.error(err);
      notifyError();
    }
  };

  const handleUpdateCCTV = async (formData) => {
    try {
      await update(selectedCCTV.id, formData);
      refresh();
      setSelectedCCTV(null);
      setOpenModal(false);
      notifyUpdate("CCTV Merk");
    } catch (err) {
      console.error(err);
      notifyError();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus CCTV Merk?")) return;

    try {
      await deleteCCTVMerk(id);
      refresh();
      notifyDelete("CCTV Merk");
    } catch (err) {
      console.error(err);
      notifyError();
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">CCTV Merk</h1>

        {canCreate && (
          <button
            onClick={() => {
              setSelectedCCTV(null);
              setOpenModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Tambah CCTV
          </button>
        )}
      </div>

      {/* GRID */}
      <CCTVGrid
        data={data}
        onEdit={(item) => {
          setSelectedCCTV(item);
          setOpenModal(true);
        }}
        onDelete={handleDelete}
      />

      {/* MODAL */}
      {openModal && (
        <CCTVMerkModal
          initialData={selectedCCTV}
          onClose={() => {
            setOpenModal(false);
            setSelectedCCTV(null);
          }}
          onSubmit={selectedCCTV ? handleUpdateCCTV : handleAddCCTV}
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

export default CCTVMerk;
