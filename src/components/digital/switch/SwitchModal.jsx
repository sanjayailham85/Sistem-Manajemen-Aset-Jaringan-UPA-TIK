import React, { useEffect, useState } from "react";
import { getAllLocation } from "../../../services/locationService";

const SwitchModal = ({ onClose, onSubmit, initialData }) => {
  const emptyForm = {
    name: "",
    ip: "",
    type: "Manage",
    location: "",
    locationDetail: "",
    status: "Active",
    detail: "",
    code: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [location, setLocation] = useState([]);

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
      const resLocation = await getAllLocation();
      setLocation(resLocation.data);
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
          {initialData ? "Edit Switch" : "Tambah Switch"}
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
          <input
            name="ip"
            value={form.ip}
            onChange={handleChange}
            placeholder="IP"
            className="input"
            required
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="input font-medium"
          >
            <option value="Manage">Manage</option>
            <option value="Unmanaged">Unmanaged</option>
          </select>
          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Pilih Lokasi</option>
            {location.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            name="locationDetail"
            value={form.locationDetail}
            onChange={handleChange}
            placeholder="Location Detail"
            className="input"
            required
          />
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
          <input
            name="detail"
            value={form.detail}
            onChange={handleChange}
            placeholder="Detail Lainnya"
            className="input"
            required
          />
          <input
            name="code"
            value={form.code}
            onChange={handleChange}
            placeholder="Code"
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

export default SwitchModal;
