import React, { useState } from "react";
import { FiX, FiUploadCloud } from "react-icons/fi";
import { importData } from "../services/importService";
import { notifyImport, notifyError } from "../utils/notifyHelper";

const ImportModal = ({ isOpen, onClose, module, onImport }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleImport = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("module", module);

      const response = await importData(formData);

      if (!response.data.success) {
        notifyError();

        return;
      }

      await onImport?.();

      setFile(null);
      onClose();

      notifyImport();
    } catch (error) {
      console.error("Import gagal:", error);
      notifyError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Import Data</h2>

          <button onClick={onClose}>
            <FiX className="text-xl text-gray-500 hover:text-red-500" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition cursor-pointer relative">
            <input
              id="fileInput"
              type="file"
              accept=".xlsx"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <label htmlFor="fileInput" className="cursor-pointer block">
              <FiUploadCloud className="mx-auto text-3xl text-gray-400 mb-2" />

              {!file ? (
                <>
                  <p className="text-sm text-gray-600 font-medium">
                    Klik untuk upload file Excel
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    atau drag & drop file ke sini
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-green-600 font-medium">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    File siap di-import
                  </p>
                </>
              )}
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t px-5 py-4 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleImport}
            disabled={!file || loading}
            className={`px-4 py-2 text-sm rounded-lg text-white transition
              ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
          >
            {loading ? "Importing..." : "Import"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
