import React, { useEffect, useState } from "react";
import { createRack, updateRack } from "../../../services/rackService";

const RackModal = ({ onClose, initialData, onSuccess }) => {
  const emptyForm = { id: "", name: "", location: "" };
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({ ...emptyForm, ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData) {
        await updateRack(initialData.id, form);
      } else {
        await createRack(form);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Gagal menyimpan rack:", error);
      alert("Terjadi kesalahan saat menyimpan rack!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5">
        <div>
          <h2 className="text-xl font-semibold">
            {initialData ? "Edit Rack" : "Tambah Rack"}
          </h2>
          <p className="text-sm text-gray-500">Lengkapi informasi Rack</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama Rack"
              className="border rounded px-3 py-2 w-full"
              required
            />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Lokasi"
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={loading}
            >
              {loading
                ? initialData
                  ? "Updating..."
                  : "Saving..."
                : initialData
                ? "Update"
                : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RackModal;
