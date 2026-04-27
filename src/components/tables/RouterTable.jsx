import React, { useEffect, useState } from "react";
import {
  getAllRouter,
  createRouter,
  updateRouter,
  deleteRouter,
} from "../../services/routerService";
import RouterModal from "../digital/router/RouterModal";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import usePermission from "../../utils/usePermission";
import { useNavigate, useParams } from "react-router-dom";
import useTableSort from "../../utils/useTableSort";
import usePagination from "../../utils/usePagination";
import {
  notifyCreate,
  notifyUpdate,
  notifyDelete,
  notifyDeleteError,
  notifyError,
} from "../../utils/notifyHelper";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const RouterTable = () => {
  const [items, setItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const { canCreate, canUpdate, canDelete } = usePermission("router");
  const { data, page, totalPages, nextPage, prevPage, loading, refresh } =
    usePagination(getAllRouter, 10);
  const { sortedData, handleSort, sortConfig } = useTableSort(data);

  const handleAdd = async (data) => {
    try {
      await createRouter(data);
      refresh();
      setOpenModal(false);
      notifyCreate("Router");
    } catch (err) {
      console.error("Gagal menambah router", err);
      notifyError();
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateRouter(selected.id, data);
      refresh();
      setSelected(null);
      setOpenModal(false);
      notifyUpdate("Router");
    } catch (err) {
      console.error("Gagal menambah router", err);
      notifyError();
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!confirm("Hapus router?")) return;
      await deleteRouter(id);
      refresh();
      notifyDelete("Router");
    } catch (err) {
      console.error("Gagal menambah router", err);
      notifyError();
    }
  };

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
      {canCreate && (
        <button
          onClick={() => {
            setSelected(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded ml-auto block m-2"
        >
          + Tambah Router
        </button>
      )}

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th
              onClick={() => handleSort("name")}
              className=" px-4 py-2 text-left cursor-pointer select-none"
            >
              Name {renderSortIcon("name")}
            </th>
            <th
              onClick={() => handleSort("ip")}
              className=" px-4 py-2 text-left cursor-pointer select-none"
            >
              IP {renderSortIcon("ip")}
            </th>
            <th
              onClick={() => handleSort("type")}
              className=" px-4 py-2 text-left cursor-pointer select-none"
            >
              Type {renderSortIcon("type")}
            </th>
            <th
              onClick={() => handleSort("status")}
              className=" px-4 py-2 text-left cursor-pointer select-none"
            >
              Status {renderSortIcon("status")}
            </th>
            {(canUpdate || canDelete) && (
              <th className="px-4 py-2 text-center">Aksi</th>
            )}
          </tr>
        </thead>

        <tbody>
          {sortedData.map((item) => (
            <tr
              key={item.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/digital/router/${item.id}`)}
            >
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.ip}</td>
              <td className="px-4 py-2">{item.type}</td>
              <td
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  item?.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : item?.status === "Inactive"
                    ? "bg-red-100 text-red-700"
                    : item?.status === "Damaged"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {item.status}
              </td>

              {(canUpdate || canDelete) && (
                <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelected(item);
                        setOpenModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FiEdit size={18} />
                    </button>

                    {canDelete && (
                      <button
                        onClick={() => handleDelete(item.id)}
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
        </tbody>
      </table>

      {openModal && (
        <RouterModal
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

export default RouterTable;
