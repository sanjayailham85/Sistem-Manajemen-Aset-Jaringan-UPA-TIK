import React, { useEffect, useState } from "react";
import { getAllMerk } from "../../../services/merkService";
import { getAllLocation } from "../../../services/locationService";

const CCTVModal = ({
  onClose,
  onSubmit,
  initialData,
  controllerId,
  selectedMerk,
}) => {
  const [form, setForm] = useState({
    name: "",
    ip: "",
    type: "Indoor",
    location: "",
    locationDetail: "",
    controllerId,
    status: "Active",
    detail: "",
    code: "",
    merk: "",
  });
  const [merkList, setMerkList] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        controllerId,
        merk: initialData.merk || selectedMerk || "",
      });
    } else {
      setForm((prev) => ({
        ...prev,
        controllerId,
        merk: selectedMerk || "",
      }));
    }
  }, [initialData, selectedMerk, controllerId]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const resMerk = await getAllMerk();
      const resLocation = await getAllLocation();

      const filteredMerk = resMerk.data.filter(
        (item) => item.category === "CCTV"
      );

      setMerkList(filteredMerk);
      setLocation(resLocation.data);
    } catch (error) {
      console.error("Failed to fetch item", error);
    }
  };

  const handleChange = (e) => {
    setForm((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      controllerId,
      merk: form.merk,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl">
        <h2 className="text-xl font-semibold">
          {initialData ? "Edit CCTV" : "Tambah CCTV"}
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
            className="input"
          >
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
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
            className="input"
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

export default CCTVModal;
