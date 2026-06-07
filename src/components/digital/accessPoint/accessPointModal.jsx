import React, { useEffect, useState } from "react";
import RelationSelector from "../../common/RelationSelector";
import { getAllMerk } from "../../../services/merkService";
import { getAllLocation } from "../../../services/locationService";
import { FiUploadCloud } from "react-icons/fi";

const AccessPointModal = ({
  onClose,
  onSubmit,
  initialData,
  controllerId,
  selectedMerk,
}) => {
  const emptyForm = {
    name: "",
    ip: "",
    tahunAnggaran: "",
    controllerAP: "",
    controllerId: controllerId,
    type: "",
    mac: "",
    location: "",
    locationDetail: "",
    code: "",
    merk: "",
    image: null,
    imagePreview: null,
  };

  const [form, setForm] = useState(emptyForm);
  const [merk, setMerk] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        controllerId,
        merk: initialData.merk || selectedMerk || "",
        image: null,
        imagePreview: initialData.imageUrl || null,
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
        (item) => item.category === "Access Point"
      );
      setMerk(filteredMerk);
      setLocation(resLocation.data);
    } catch (error) {
      console.error("Failed to fetch item", error);
    }
  };

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

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("ip", form.ip);
    formData.append("tahunAnggaran", form.tahunAnggaran);
    formData.append("controllerAP", form.controllerAP);
    formData.append("controllerId", controllerId);
    formData.append("type", form.type);
    formData.append("location", form.location);
    formData.append("locationDetail", form.locationDetail);
    formData.append("mac", form.mac);
    formData.append("code", form.code);
    formData.append("merk", form.merk);

    if (form.image) {
      formData.append("image", form.image);
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5">
        <div>
          <h2 className="text-xl font-semibold">
            {initialData ? "Edit Access Point" : "Tambah Access Point"}
          </h2>
          <p className="text-sm text-gray-500">
            Lengkapi informasi Access Point
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              placeholder="IP Address"
              className="input"
              required
            />
            <select
              name="tahunAnggaran"
              value={form.tahunAnggaran}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Tahun Anggaran</option>
              {Array.from({ length: 10 }).map((_, i) => {
                const tahunAnggaran = new Date().getFullYear() - i;
                return (
                  <option key={tahunAnggaran} value={tahunAnggaran}>
                    {tahunAnggaran}
                  </option>
                );
              })}
            </select>
            <input
              name="mac"
              value={form.mac}
              onChange={handleChange}
              placeholder="mac"
              className="input"
              required
            />
            <input
              name="controllerAP"
              value={form.controllerAP}
              onChange={handleChange}
              placeholder="Controller AP"
              className="input"
              required
            />
            <input
              name="type"
              value={form.type}
              onChange={handleChange}
              placeholder="Type"
              className="input"
              required
            />

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

            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="Code"
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Gambar Access Point
            </label>

            <label
              htmlFor="accessPointImage"
              className="flex flex-col items-center justify-center
              border-2 border-dashed rounded-lg p-6 cursor-pointer
              text-gray-500 hover:border-blue-500 hover:text-blue-600 transition"
            >
              <FiUploadCloud size={24} />
              <span className="mt-2 text-sm font-medium">
                Klik untuk upload gambar Access Point
              </span>
              <span className="text-xs text-gray-400">PNG, JPG, JPEG</span>
            </label>

            <input
              id="accessPointImage"
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

export default AccessPointModal;
