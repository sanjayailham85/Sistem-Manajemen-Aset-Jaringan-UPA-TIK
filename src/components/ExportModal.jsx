import React, { useState } from "react";
import { FiX, FiDownload } from "react-icons/fi";

const ExportModal = ({ isOpen, onClose, onExport, title = "Export Data" }) => {
  const [format, setFormat] = useState("excel");
  const [dataType, setDataType] = useState("all");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    try {
      setLoading(true);

      await onExport({
        format,
        dataType,
      });

      onClose();
    } catch (error) {
      console.error("Export gagal:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button onClick={onClose} disabled={loading}>
            <FiX className="text-xl text-gray-500 hover:text-red-500" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              File Format
            </label>

            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              disabled={loading}
            >
              <option value="excel">Excel (.xlsx)</option>
              {/* <option value="csv">CSV (.csv)</option>
              <option value="pdf">PDF (.pdf)</option> */}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Export Data
            </label>

            <select
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              disabled={loading}
            >
              <option value="all">All Data</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t px-5 py-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleExport}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <FiDownload />
            {loading ? "Exporting..." : "Export"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
