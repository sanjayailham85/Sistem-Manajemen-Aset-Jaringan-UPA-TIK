import React, { useEffect, useState } from "react";

const RackModal = ({ onClose, onSubmit, initialData }) => {
  const emptyForm = {
    name: "",
    location: "",
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
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold">
            {initialData ? "Edit Rack" : "Tambah Rack"}
          </h2>
          <p className="text-sm text-gray-500">Lengkapi informasi Rack</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Informasi Utama */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama Rack"
              className="input"
              required
            />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Lokasi"
              className="input"
              required
            />
          </div>

          {/* Action */}
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

export default RackModal;
