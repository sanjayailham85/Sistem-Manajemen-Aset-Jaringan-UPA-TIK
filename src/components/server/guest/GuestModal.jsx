import React, { useEffect, useState } from "react";
import RelationSelector from "../../common/RelationSelector";
import { useLocation } from "react-router-dom";
import { getAllOsVersion } from "../../../services/osVersionService";

const GuestModal = ({ onClose, onSubmit, hostId, initialData }) => {
  const emptyForm = {
    name: "",
    ip: "",
    hostId,
    authUsername: "",
    authPassword: "",
    owner: "",
    domainInstance: "",
    ramUnit: "GB",
    storage: "",
    storageUnit: "GB",
    cpu: "",
    cpuUnit: "GHz",
    model: "",
    osVersion: "",
    status: "Active",
    detail: "",
  };

  const [form, setForm] = useState(emptyForm);
  const location = useLocation();
  const [osVersions, setOsVersions] = useState([]);

  useEffect(() => {
    fetchOsVersions();
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...emptyForm,
        ...initialData,
      });
    }
  }, [initialData]);

  const fetchOsVersions = async () => {
    try {
      const res = await getAllOsVersion();
      setOsVersions(res.data);
    } catch (error) {
      console.error("Failed to fetch OS versions", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      ram: `${form.ram} ${form.ramUnit}`,
      storage: `${form.storage} ${form.storageUnit}`,
      cpu: `${form.cpu} ${form.cpuUnit}`,
    };

    onSubmit(payload);
  };

  const isEdit = Boolean(initialData);
  const isFromDetail = location.pathname.includes("/racks");
  const showRelationSelector = !isEdit && !isFromDetail;

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
          {showRelationSelector && (
            <RelationSelector level="guest" form={form} setForm={setForm} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
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
              name="authUsername"
              value={form.authUsername}
              onChange={handleChange}
              placeholder="Username"
              className="input"
              required
            />
            <input
              name="authPassword"
              value={form.authPassword}
              onChange={handleChange}
              placeholder="Password"
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
              Spesifikasi Guest
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="model"
                value={form.model}
                onChange={handleChange}
                placeholder="Model Server"
                className="input"
              />

              <div className="flex gap-2">
                <input
                  name="ram"
                  value={form.ram}
                  onChange={handleChange}
                  placeholder="RAM"
                  className="input flex-1"
                />

                <select
                  name="ramUnit"
                  value={form.ramUnit}
                  onChange={handleChange}
                  className="input !w-16 flex-none"
                >
                  <option value="GB">GB</option>
                  <option value="TB">TB</option>
                </select>
              </div>
              <div className="flex gap-2">
                <input
                  name="cpu"
                  value={form.cpu}
                  onChange={handleChange}
                  placeholder="CPU"
                  className="input flex-1"
                />

                <select
                  name="cpuUnit"
                  value={form.cpuUnit}
                  onChange={handleChange}
                  className="input !w-16 flex-none"
                >
                  <option value="GHz">GHz</option>
                </select>
              </div>
              <div className="flex gap-2">
                <input
                  name="storage"
                  value={form.storage}
                  onChange={handleChange}
                  placeholder="STORAGE"
                  className="input flex-1"
                />

                <select
                  name="storageUnit"
                  value={form.storageUnit}
                  onChange={handleChange}
                  className="input !w-16 flex-none"
                >
                  <option value="GB">GB</option>
                  <option value="TB">TB</option>
                </select>
              </div>
              <select
                name="osVersion"
                value={form.osVersion}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Pilih OS Version</option>
                {osVersions.map((os) => (
                  <option key={os.id} value={os.id}>
                    {os.name} {os.version}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input font-medium"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Damaged">Damaged</option>
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
