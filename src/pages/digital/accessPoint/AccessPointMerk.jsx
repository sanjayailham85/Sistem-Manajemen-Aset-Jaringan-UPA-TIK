import React, { useState } from "react";
import AccessPointGrid from "../../../components/digital/accessPoint/AccessPointGrid";
import AccessPointMerkModal from "../../../components/digital/accessPoint/AccessPointMerkModal";
import {
  getAll,
  create,
  update,
  deleteAccessPointMerk,
} from "../../../services/accessPointMerkService";
import usePermission from "../../../utils/usePermission";
import usePagination from "../../../utils/usePagination";
import {
  notifyCreate,
  notifyUpdate,
  notifyDelete,
  notifyError,
} from "../../../utils/notifyHelper";

const AccessPointMerk = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedAccessPoint, setSelectedAccessPoint] = useState(null);

  const { canCreate, canUpdate, canDelete } = usePermission("accessPointMerk");

  const { data, page, totalPages, nextPage, prevPage, refresh, loading } =
    usePagination(getAll, 9);

  const handleAddAccessPoint = async (formData) => {
    try {
      await create(formData);
      refresh();
      setOpenModal(false);
      notifyCreate("AccessPoint Merk");
    } catch (err) {
      console.error(err);
      notifyError();
    }
  };

  const handleUpdateAccessPoint = async (formData) => {
    try {
      await update(selectedAccessPoint.id, formData);
      refresh();
      setSelectedAccessPoint(null);
      setOpenModal(false);
      notifyUpdate("AccessPoint Merk");
    } catch (err) {
      console.error(err);
      notifyError();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus AccessPoint Merk?")) return;

    try {
      await deleteAccessPointMerk(id);
      refresh();
      notifyDelete("AccessPoint Merk");
    } catch (err) {
      console.error(err);
      notifyError();
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">AccessPoint Merk</h1>

        {canCreate && (
          <button
            onClick={() => {
              setSelectedAccessPoint(null);
              setOpenModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Tambah Access Point
          </button>
        )}
      </div>

      {/* GRID */}
      <AccessPointGrid
        data={data}
        onEdit={(item) => {
          setSelectedAccessPoint(item);
          setOpenModal(true);
        }}
        onDelete={handleDelete}
      />

      {/* MODAL */}
      {openModal && (
        <AccessPointMerkModal
          initialData={selectedAccessPoint}
          onClose={() => {
            setOpenModal(false);
            setSelectedAccessPoint(null);
          }}
          onSubmit={
            selectedAccessPoint ? handleUpdateAccessPoint : handleAddAccessPoint
          }
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

export default AccessPointMerk;
