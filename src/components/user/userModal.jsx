import React, { useEffect, useState } from "react";

const UserModal = ({ onClose, onSubmit, initialData }) => {
  const emptyForm = {
    username: "",
    name: "",
    password: "",
    role: "networking",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        username: initialData.username || "",
        name: initialData.name || "",
        password: "", // jangan isi password lama
        role: initialData.role || "networking",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...form };

    // kalau edit tapi password kosong → jangan kirim password
    if (!payload.password) {
      delete payload.password;
    }

    onSubmit(payload);
  };

  const isEdit = Boolean(initialData);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5">
        {/* HEADER */}
        <div>
          <h2 className="text-xl font-semibold">
            {isEdit ? "Edit User" : "Tambah User"}
          </h2>
          <p className="text-sm text-gray-500">Lengkapi informasi user</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="input"
              required
            />

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama"
              className="input"
              required
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder={
                isEdit ? "Password (kosongkan jika tidak diubah)" : "Password"
              }
              className="input"
              required={!isEdit}
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="input font-medium"
            >
              <option value="superadmin">Superadmin</option>
              <option value="admin">Admin</option>
              <option value="networking">Networking</option>
              <option value="sysadmin">SysAdmin</option>
              <option value="operator">Operator</option>
            </select>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {isEdit ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
