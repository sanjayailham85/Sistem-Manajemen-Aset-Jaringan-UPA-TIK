import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userService";
import UserModal from "../user/userModal";
import usePermission from "../../utils/usePermission";
import {
  notifyCreate,
  notifyUpdate,
  notifyDelete,
  notifyDeleteError,
  notifyError,
} from "../../utils/notifyHelper";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { canCreate, canUpdate, canDelete } = usePermission("user");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Gagal mengambil data user", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (data) => {
    try {
      await createUser(data);
      fetchUsers();
      setOpenModal(false);
      notifyCreate("User");
    } catch (err) {
      console.error("Gagal menambah user", err);
      notifyError();
    }
  };

  const handleUpdateUser = async (data) => {
    try {
      await updateUser(selectedUser.id, data);
      fetchUsers();
      setSelectedUser(null);
      setOpenModal(false);
      notifyUpdate("User");
    } catch (err) {
      console.error("Gagal update user", err);
      notifyError();
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah yakin ingin menghapus user ini?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      fetchUsers();
      notifyDelete("User");
    } catch (err) {
      console.error("Gagal menghapus user", err);
      notifyError();
    }
  };

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <div className="m-2">
        {canCreate && (
          <button
            onClick={() => {
              setSelectedUser(null);
              setOpenModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded ml-auto block mb-3"
          >
            + Tambah User
          </button>
        )}
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Username</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Role</th>

            {(canUpdate || canDelete) && (
              <th className="px-4 py-2 text-center w-28">Aksi</th>
            )}
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2 capitalize">{user.role}</td>

              {(canUpdate || canDelete) && (
                <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-center gap-3">
                    {canUpdate && (
                      <button
                        onClick={() => {
                          setSelectedUser(user);
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
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={
                          JSON.parse(localStorage.getItem("user"))?.id ===
                          user.id
                        }
                        className={`${
                          JSON.parse(localStorage.getItem("user"))?.id ===
                          user.id
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-red-600 hover:text-red-800"
                        }`}
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

          {users.length === 0 && (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-500">
                Tidak ada user
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {openModal && (
        <UserModal
          initialData={selectedUser}
          onClose={() => {
            setOpenModal(false);
            setSelectedUser(null);
          }}
          onSubmit={selectedUser ? handleUpdateUser : handleAddUser}
        />
      )}
    </div>
  );
};

export default UserTable;
