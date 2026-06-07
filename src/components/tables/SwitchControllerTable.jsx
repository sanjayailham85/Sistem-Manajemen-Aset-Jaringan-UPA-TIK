import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  getAll,
  create,
  update,
  deleteSwitchController,
} from "../../services/switchControllerService";
import usePagination from "../../utils/usePagination";
import usePermission from "../../utils/usePermission";
import SwitchControllerModal from "../../components/digital/switch/SwitchControllerModal";
import {
  notifyCreate,
  notifyUpdate,
  notifyDelete,
  notifyDeleteError,
  notifyError,
} from "../../utils/notifyHelper";

const ControllerTable = () => {
  const { merkId } = useParams();
  const { canCreate, canUpdate, canDelete } = usePermission("switchController");
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchControllerByMerk = useCallback(
    (page, limit) => getAll(page, limit, merkId),
    [merkId]
  );

  const { data, page, totalPages, nextPage, prevPage, refresh } = usePagination(
    fetchControllerByMerk,
    10
  );

  useEffect(() => {
    refresh();
  }, [merkId]);

  const handleAdd = async (data) => {
    try {
      await create(data);
      await refresh();
      setOpenModal(false);
      notifyCreate("");
    } catch (err) {
      console.error(err);
      notifyError("Gagal menambah");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await update(selected.id, data);
      await refresh();
      setSelected(null);
      setOpenModal(false);
      notifyUpdate("");
    } catch (err) {
      console.error(err);
      notifyError("Gagal update");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!confirm("Hapus data ini?")) return;

      await deleteSwitchController(id);
      await refresh();
      notifyDelete("");
    } catch (err) {
      const code = err?.response?.data?.code;
      if (code === "Switch_NOT_EMPTY") {
        notifyDeleteError("");
      } else {
        notifyError();
      }
    }
  };

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <div className="flex justify-end gap-2 p-2">
        {canCreate && (
          <button
            onClick={() => {
              setSelected(null);
              setOpenModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            + Tambah Controller
          </button>
        )}
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Controller IP Address</th>
            <th className="px-4 py-2 text-left">Total Switch</th>
            {(canUpdate || canDelete) && (
              <th className="px-4 py-2 text-center w-28">Aksi</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() =>
                navigate(`/switchMerk/${merkId}/controller/${item.id}`)
              }
              className="border-t hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-4 py-2">{item.ip}</td>
              <td className="px-4 py-2">{item.totalSwitch}</td>

              {(canUpdate || canDelete) && (
                <td className="px-4 py-2">
                  <div className="flex justify-center gap-3">
                    {canUpdate && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(item);
                          setOpenModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FiEdit size={18} />
                      </button>
                    )}

                    {canDelete && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
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

          {data.length === 0 && (
            <tr>
              <td colSpan="2" className="py-4 text-center text-gray-500">
                Tidak ada data Controller
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {openModal && (
        <SwitchControllerModal
          merkId={merkId}
          initialData={selected}
          onClose={() => setOpenModal(false)}
          onSubmit={selected ? handleUpdate : handleAdd}
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

export default ControllerTable;
