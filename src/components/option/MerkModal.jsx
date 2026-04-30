import React, { useEffect, useState } from "react";

const MerkModal = ({ onClose, onSubmit, initialData }) => {
  const emptyForm = {
    name: "",
    category: "Access Point",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({ ...emptyForm, ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 space-y-5">
        <h2 className="text-xl font-semibold">
          {initialData ? "Edit Merk" : "Tambah Merk"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="input"
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input font-medium"
          >
            <option value="Access Point">Access Point</option>
            <option value="Router">Router</option>
            <option value="CCTV">CCTV</option>
          </select>

          <div className="col-span-2 flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Batal
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              {initialData ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MerkModal;
