import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getAllAccessPoint,
  createAccessPoint,
  updateAccessPoint,
  deleteAccessPoint,
} from "../../services/accessPointService";
import AccessPointModal from "../digital/accessPoint/AccessPointModal";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import usePermission from "../../utils/usePermission";
import useTableSort from "../../utils/useTableSort";
import usePagination from "../../utils/usePagination";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const AccessPointTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const { canCreate, canUpdate, canDelete } = usePermission("accessPoint");
  const { data, page, totalPages, nextPage, prevPage, loading, refresh } =
    usePagination(getAllAccessPoint, 10);
  const { sortedData, handleSort, sortConfig } = useTableSort(data);

  // const fetchData = async () => {
  //   const res = await getAllAccessPoint();
  //   setItems(res.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleAdd = async (data) => {
    await createAccessPoint(data);
    refresh();
    setOpenModal(false);
  };

  const handleUpdate = async (data) => {
    await updateAccessPoint(selected.id, data);
    refresh();
    setSelected(null);
    setOpenModal(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus access point?")) return;
    await deleteAccessPoint(id);
    refresh();
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
          + Tambah Access Point
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
              onClick={() => handleSort("location")}
              className=" px-4 py-2 text-left cursor-pointer select-none"
            >
              Location {renderSortIcon("location")}
            </th>

            {(canUpdate || canDelete) && (
              <th className="px-4 py-2 text-center">Aksi</th>
            )}
          </tr>
        </thead>

        <tbody>
          {sortedData.map((item) => (
            <tr
              onClick={() => navigate(`/digital/accessPoint/${item.id}`)}
              key={item.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.ip}</td>
              <td className="px-4 py-2">{item.type}</td>
              <td className="px-4 py-2">{item.location}</td>

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
        <AccessPointModal
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

export default AccessPointTable;
