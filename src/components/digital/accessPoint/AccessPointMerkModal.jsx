import React, { useEffect, useState } from "react";
import RelationSelector from "../../common/RelationSelector";
import { getAllMerk } from "../../../services/merkService";

const AccessPointModal = ({ onClose, onSubmit, initialData }) => {
  const emptyForm = {
    name: "Aruba",
  };

  const [form, setForm] = useState(emptyForm);
  const [merk, setMerk] = useState([]);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...emptyForm,
        ...initialData,
      });
    }
  }, [initialData]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const resMerk = await getAllMerk();
      const filteredMerk = resMerk.data.filter(
        (item) => item.category === "Access Point"
      );
      setMerk(filteredMerk);
    } catch (error) {
      console.error("Failed to fetch item", error);
    }
  };

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
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 space-y-5">
        <h2 className="text-xl font-semibold">
          {initialData ? "Edit Merk" : "Tambah Merk"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <select
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Pilih Merk</option>
            {merk.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
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

export default AccessPointModal;
