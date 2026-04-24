import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccessPointById } from "../../../services/accessPointService";
import formatDate from "../../../utils/formatDate";

const AccessPointDetail = () => {
  const { id } = useParams();
  const [accessPoint, setAccessPoint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccessPoint = async () => {
      try {
        setLoading(true);
        const res = await getAccessPointById(id);
        setAccessPoint(res.data);
      } catch (err) {
        console.error("Gagal mengambil data Access Point", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAccessPoint();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-gray-500 animate-pulse">
        Loading detail access point...
      </div>
    );
  }

  if (!accessPoint) {
    return <div className="p-6 text-red-500">Data tidak ditemukan</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Detail Access Point
          </h1>
          <p className="text-sm text-gray-500">
            Informasi lengkap perangkat jaringan
          </p>
        </div>

        <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
          {accessPoint.code}
        </span>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        {/* GRID INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* KOLOM 1 */}
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-700 border-b pb-2">
              Informasi Utama
            </h2>

            <div>
              <p className="text-gray-500 text-sm">Nama Server</p>
              <p className="font-medium">{accessPoint.name}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Type</p>
              <p className="font-medium">{accessPoint.type}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Tahun Anggaran</p>
              <p className="font-medium">{accessPoint.tahunAnggaran}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Controller AP</p>
              <p className="font-medium">{accessPoint.controllerAP}</p>
            </div>
          </div>

          {/* KOLOM 2 */}
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-700 border-b pb-2">
              Network & Lokasi
            </h2>

            <div>
              <p className="text-gray-500 text-sm">IP Address</p>
              <span className="inline-block px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                {accessPoint.ip}
              </span>
            </div>

            <div>
              <p className="text-gray-500 text-sm">MAC Address</p>
              <p className="font-mono">{accessPoint.mac}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p className="font-medium">{accessPoint.location}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Detail Lokasi</p>
              <p className="font-medium">{accessPoint.locationDetail}</p>
            </div>
          </div>
        </div>

        {/* FOOTER INFO */}
        <div className="pt-4 border-t text-xs text-gray-400 flex justify-between">
          <span>Created: {formatDate(accessPoint.createdAt)}</span>
          <span>Updated: {formatDate(accessPoint.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default AccessPointDetail;
