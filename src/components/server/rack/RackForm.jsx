import React from "react";

const RackForm = ({ form, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 text-sm">
      <input
        name="name"
        placeholder="Nama Rack"
        value={form.name}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        name="location"
        placeholder="Lokasi"
        value={form.location}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded"
      />

      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

export default RackForm;
