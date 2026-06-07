import React, { useEffect, useState } from "react";
import { getAll } from "../../services/subDomainService";

const DomainModal = ({ onClose, onSubmit, initialData }) => {
  const emptyForm = {
    name: "",
    subDomain: "",
    author: "",
    contact: "",
    status: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [subDomain, setSubDomain] = useState([]);

  useEffect(() => {
    if (initialData) {
      setForm({ ...emptyForm, ...initialData });
    }
  }, [initialData]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await getAll();
      setSubDomain(res.data);
    } catch (error) {
      console.error("Failed to fetch item", error);
    }
  };

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
          {initialData ? "Edit Domain" : "Tambah Domain"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Domain Name"
            className="input"
            required
          />

          <select
            name="subDomain"
            value={form.subDomain}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Pilih Sub Domain</option>
            {subDomain.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author"
            className="input"
            required
          />
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="contact"
            className="input"
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Damaged">Damaged</option>
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

export default DomainModal;
