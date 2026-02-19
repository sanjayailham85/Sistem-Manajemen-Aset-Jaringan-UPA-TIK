import React, { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

const PhysicalModal = ({
  onClose,
  onSubmit,
  rackName,
  rackId,
  initialData,
}) => {
  const emptyForm = {
    name: "",
    ip: "",
    rackId,
    authUsername: "",
    authPassword: "",
    owner: "",
    ownerContact: "",
    year: "",
    status: "Active",
    model: "",
    cpu: "",
    ram: "",
    storage: "",
    detail: "",
    image: null,
    imagePreview: null,
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...emptyForm,
        ...initialData,
        rackName: initialData.rackName || rackName,
        image: null,
        imagePreview: initialData.imageUrl || null,
      });
    }
  }, [initialData, rackName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
      imagePreview: URL.createObjectURL(file),
    }));
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
            {initialData ? "Edit Physical Server" : "Tambah Physical Server"}
          </h2>
          <p className="text-sm text-gray-500">
            Lengkapi informasi physical server
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama Server"
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
              placeholder="Owner"
              className="input"
              required
            />
            <input
              name="ownerContact"
              value={form.ownerContact}
              onChange={handleChange}
              placeholder="Owner Contact"
              className="input"
              required
            />

            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Tahun Pengadaan</option>
              {Array.from({ length: 10 }).map((_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
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
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Gambar Server
            </label>

            <label
              htmlFor="serverImage"
              className="flex flex-col items-center justify-center
              border-2 border-dashed rounded-lg p-6 cursor-pointer
              text-gray-500 hover:border-blue-500 hover:text-blue-600 transition"
            >
              <FiUploadCloud size={24} />
              <span className="mt-2 text-sm font-medium">
                Klik untuk upload gambar server
              </span>
              <span className="text-xs text-gray-400">PNG, JPG, JPEG</span>
            </label>

            <input
              id="serverImage"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {form.imagePreview && (
              <img
                src={form.imagePreview}
                alt="Preview"
                className="mt-4 h-40 object-contain rounded border"
              />
            )}
          </div>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input font-medium"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
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

export default PhysicalModal;
