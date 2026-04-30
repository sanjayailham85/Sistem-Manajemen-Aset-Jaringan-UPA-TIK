import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRouterById } from "../../../services/routerService";
import formatDate from "../../../utils/formatDate";

const RouterDetail = () => {
  const { id } = useParams();
  const [router, setRouter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRouter = async () => {
      try {
        setLoading(true);
        const res = await getRouterById(id);
        setRouter(res.data);
      } catch (err) {
        console.error("Gagal mengambil data Router", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRouter();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-gray-500 animate-pulse">
        Loading detail Router...
      </div>
    );
  }

  if (!router) {
    return <div className="p-6 text-red-500">Data tidak ditemukan</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Detail Router</h1>
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
              <p className="font-medium">{router.name}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Type</p>
              <p className="font-medium">{router.type}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Merk</p>
              <p className="font-medium">{router.merk}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Status</p>
              <p
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  router.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : router.status === "Inactive"
                    ? "bg-red-100 text-red-700"
                    : router.status === "Damaged"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {router.status}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Detail</p>
              <p className="font-medium">{router.detail}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Code</p>
              <p className="font-medium">{router.code}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-gray-700 border-b pb-2">
              Network & Location
            </h2>

            <div>
              <p className="text-gray-500 text-sm">IP Address</p>
              <span className="inline-block px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                {router.ip}
              </span>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p className="font-medium">{router.location}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Detail Lokasi</p>
              <p className="font-medium">{router.locationDetail}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t text-xs text-gray-400 flex justify-between">
          <span>Created: {formatDate(router.createdAt)}</span>
          <span>Updated: {formatDate(router.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default RouterDetail;
