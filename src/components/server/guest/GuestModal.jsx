import React, { useEffect, useState } from "react";

const GuestModal = ({ onClose, onSubmit, hostId, initialData }) => {
  const emptyForm = {
    instanceName: "",
    ip: "",
    hostId,
    auth: "",
    owner: "",
    domainInstance: "",
    ram: "",
    storage: "",
    cpu: "",
    model: "",
    osVersion: "",
    status: "Active",
    detail: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...emptyForm,
        ...initialData,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5">
        <div>
          <h2 className="text-xl font-semibold">
            {initialData ? "Edit Guest" : "Tambah Guest"}
          </h2>
          <p className="text-sm text-gray-500">Lengkapi informasi guest</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="instanceName"
              value={form.instanceName}
              onChange={handleChange}
              placeholder="Instance Name"
              className="input"
              required
            />
            <input
              name="ip"
              value={form.ip}
              onChange={handleChange}
              placeholder="IP Address"
              className="input"
              required
            />
            <input
              name="auth"
              value={form.auth}
              onChange={handleChange}
              placeholder="User Auth"
              className="input"
              required
            />
            <input
              name="owner"
              value={form.owner}
              onChange={handleChange}
              placeholder="Owner / Pengelola"
              className="input"
              required
            />
            <input
              name="domainInstance"
              value={form.domainInstance}
              onChange={handleChange}
              placeholder="Domain Instance"
              className="input"
              required
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Spesifikasi Server
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="model"
                value={form.model}
                onChange={handleChange}
                placeholder="Model Server"
                className="input"
              />
              <input
                name="cpu"
                value={form.cpu}
                onChange={handleChange}
                placeholder="CPU"
                className="input"
              />
              <input
                name="ram"
                value={form.ram}
                onChange={handleChange}
                placeholder="RAM"
                className="input"
              />
              <input
                name="storage"
                value={form.storage}
                onChange={handleChange}
                placeholder="Storage"
                className="input"
              />
              <input
                name="osVersion"
                value={form.osVersion}
                onChange={handleChange}
                placeholder="OS Version"
                className="input"
              />
            </div>
          </div>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input font-medium"
          >
            <option value="aktif">Aktif</option>
            <option value="tidakAktif">Tidak Aktif</option>
            <option value="rusak">Rusak</option>
          </select>

          <textarea
            name="detail"
            value={form.detail}
            onChange={handleChange}
            rows={4}
            className="input resize-none"
            placeholder="Detail tambahan mengenai server"
          />

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
              {initialData ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuestModal;
