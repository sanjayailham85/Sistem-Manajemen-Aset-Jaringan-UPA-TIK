import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCCTVById } from "../../../services/cctvService";
import formatDate from "../../../utils/formatDate";

const CCTVDetail = () => {
  const { id } = useParams();
  const [cctv, setCCTV] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCCTV = async () => {
      try {
        setLoading(true);
        const res = await getCCTVById(id);
        setCCTV(res.data);
      } catch (err) {
        console.error("Gagal mengambil data CCTV", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCCTV();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-gray-500 animate-pulse">
        Loading detail CCTV...
      </div>
    );
  }

  if (!cctv) {
    return <div className="p-6 text-red-500">Data tidak ditemukan</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Detail CCTV</h1>
          <p className="text-sm text-gray-500">
            Informasi lengkap perangkat jaringan
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-700 border-b pb-2">
              Informasi Utama
            </h2>

            <div>
              <p className="text-gray-500 text-sm">Name</p>
              <p className="font-medium">{cctv.name}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Type</p>
              <p className="font-medium">{cctv.type}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Merk</p>
              <p className="font-medium">{cctv.merk}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Status</p>
              <p
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  cctv.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : cctv.status === "Inactive"
                    ? "bg-red-100 text-red-700"
                    : cctv.status === "Damaged"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {cctv.status}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Detail</p>
              <p className="font-medium">{cctv.detail}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Code</p>
              <p className="font-medium">{cctv.code}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-gray-700 border-b pb-2">
              Network & Location
            </h2>

            <div>
              <p className="text-gray-500 text-sm">IP Address</p>
              <span className="inline-block px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                {cctv.ip}
              </span>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p className="font-medium">{cctv.location}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Detail Lokasi</p>
              <p className="font-medium">{cctv.locationDetail}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t text-xs text-gray-400 flex justify-between">
          <span>Created: {formatDate(cctv.createdAt)}</span>
          <span>Updated: {formatDate(cctv.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default CCTVDetail;
