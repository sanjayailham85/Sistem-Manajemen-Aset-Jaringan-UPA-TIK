import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccessPointById } from "../../../services/accessPointService";
import formatDate from "../../../utils/formatDate";
import { IMAGE_BASE_URL } from "../../../config/api";

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

  if (loading || !accessPoint) {
    return (
      <div className="p-6 text-gray-500 animate-pulse">
        Loading access point...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Detail Access Point
        </h1>
        <p className="text-sm text-gray-500">
          Informasi lengkap perangkat jaringan
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="overflow-hidden rounded-lg border">
              <img
                src={
                  accessPoint?.image
                    ? `http://localhost:5000/uploads/${accessPoint.image}`
                    : "/no-image.png"
                }
                alt={accessPoint?.name}
                className="w-full h-56 object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-5">
            <div>
              <h2 className="text-xl font-semibold">{accessPoint?.name}</h2>
              <p className="text-sm text-gray-500">{accessPoint?.ip}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Type</p>
                <p className="font-medium">{accessPoint?.type}</p>
              </div>

              <div>
                <p className="text-gray-500">Tahun Anggaran</p>
                <p className="font-medium">{accessPoint?.tahunAnggaran}</p>
              </div>

              <div>
                <p className="text-gray-500">Controller AP</p>
                <p className="font-medium">{accessPoint?.controllerAP}</p>
              </div>

              <div>
                <p className="text-gray-500">Merk</p>
                <p className="font-medium">{accessPoint?.merk}</p>
              </div>

              <div>
                <p className="text-gray-500">Code</p>
                <p className="font-medium">{accessPoint?.code}</p>
              </div>

              <div>
                <p className="text-gray-500">Location</p>
                <p className="font-medium">{accessPoint?.location}</p>
              </div>

              <div>
                <p className="text-gray-500">Detail Lokasi</p>
                <p className="font-medium">{accessPoint?.locationDetail}</p>
              </div>

              <div>
                <p className="text-gray-500">MAC Address</p>
                <p className="font-medium">{accessPoint?.mac}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t flex justify-between text-xs text-gray-400">
          <span>Created: {formatDate(accessPoint?.createdAt)}</span>
          <span>Updated: {formatDate(accessPoint?.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default AccessPointDetail;
