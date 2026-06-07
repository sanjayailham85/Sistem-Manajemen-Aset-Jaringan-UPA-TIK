import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCCTVById } from "../../../services/cctvService";
import formatDate from "../../../utils/formatDate";
import { IMAGE_BASE_URL } from "../../../config/api";

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

  if (loading || !cctv) {
    return (
      <div className="p-6 text-gray-500 animate-pulse">
        Loading access point...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Detail CCTV</h1>
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
                  cctv?.image
                    ? `${IMAGE_BASE_URL}/${cctv.image}`
                    : "/no-image.png"
                }
                alt={cctv?.name}
                className="w-full h-56 object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-5">
            <div>
              <h2 className="text-xl font-semibold">{cctv?.name}</h2>
              <p className="text-sm text-gray-500">{cctv?.ip}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Type</p>
                <p className="font-medium">{cctv?.type}</p>
              </div>

              <div>
                <p className="text-gray-500">Merk</p>
                <p className="font-medium">{cctv?.merk}</p>
              </div>
              <div>
                <p className="text-gray-500">Code</p>
                <p className="font-medium">{cctv?.code}</p>
              </div>
              <div>
                <p className="text-gray-500">Location</p>
                <p className="font-medium">{cctv?.location}</p>
              </div>
              <div>
                <p className="text-gray-500">Location Detail</p>
                <p className="font-medium">{cctv?.locationDetail}</p>
              </div>

              <div>
                <div className="text-gray-500">Status</div>
                <p
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    cctv?.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : cctv?.status === "Inactive"
                      ? "bg-red-100 text-red-700"
                      : cctv?.status === "Damaged"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {cctv?.status}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t text-sm">
          <p className="text-gray-500">Detail</p>
          <p className="mt-1 text-gray-700">{cctv?.detail}</p>
        </div>
        <div className="mt-6 pt-4 border-t flex justify-between text-xs text-gray-400">
          <span>Created: {formatDate(cctv?.createdAt)}</span>
          <span>Updated: {formatDate(cctv?.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default CCTVDetail;
