import React, { useEffect, useState } from "react";
import RelationSelector from "../../common/RelationSelector";
import { useLocation } from "react-router-dom";
import { getAllOsVersion } from "../../../services/optionService";

const HostModal = ({ onClose, onSubmit, initialData }) => {
  const emptyForm = {
    name: "",
    ip: "",
    rackId: "",
    physicalId: "",
    authUsername: "",
    authPassword: "",
    version: "",
    serverDevice: "",
    status: "Active",
    detail: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [osVersions, setOsVersions] = useState([]);
  const location = useLocation();

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
            {initialData ? "Edit Host" : "Tambah Host"}
          </h2>
          <p className="text-sm text-gray-500">Lengkapi informasi host</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {showRelationSelector && (
            <RelationSelector level="host" form={form} setForm={setForm} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama Host"
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

            <select
              name="version"
              value={form.version}
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

            <input
              name="serverDevice"
              value={form.serverDevice}
              onChange={handleChange}
              placeholder="Server Device"
              className="input"
              required
            />
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
            placeholder="Detail tambahan mengenai host"
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

export default HostModal;
