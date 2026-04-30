import React, { useEffect, useState } from "react";

const CCTVControllerModal = ({ onClose, onSubmit, initialData, merkId }) => {
  const [form, setForm] = useState({
    ip: "",
    merkId: merkId || "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ip: initialData.ip || "",
        merkId: initialData.merkId || merkId || "",
      });
    } else {
      setForm({
        ip: "",
        merkId: merkId || "",
      });
    }
  }, [initialData, merkId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      merkId,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 space-y-5">
        <h2 className="text-xl font-semibold">
          {initialData ? "Edit Controller" : "Tambah Controller"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="ip"
            value={form.ip}
            onChange={handleChange}
            placeholder="IP Address"
            className="input"
            required
          />

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

export default CCTVControllerModal;
