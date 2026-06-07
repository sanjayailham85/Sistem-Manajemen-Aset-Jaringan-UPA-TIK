import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRouterById } from "../../../services/routerService";
import formatDate from "../../../utils/formatDate";
import { IMAGE_BASE_URL } from "../../../config/api";

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

  if (loading || !router) {
    return (
      <div className="p-6 text-gray-500 animate-pulse">Loading router...</div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Detail Router</h1>
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
                  router?.image
                    ? `${IMAGE_BASE_URL}/${router.image}`
                    : "/no-image.png"
                }
                alt={router?.name}
                className="w-full h-56 object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-5">
            <div>
              <h2 className="text-xl font-semibold">{router?.name}</h2>
              <p className="text-sm text-gray-500">{router?.ip}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Type</p>
                <p className="font-medium">{router?.type}</p>
              </div>

              <div>
                <p className="text-gray-500">Merk</p>
                <p className="font-medium">{router?.merk}</p>
              </div>
              <div>
                <p className="text-gray-500">Code</p>
                <p className="font-medium">{router?.code}</p>
              </div>
              <div>
                <p className="text-gray-500">Location</p>
                <p className="font-medium">{router?.location}</p>
              </div>
              <div>
                <p className="text-gray-500">Location Detail</p>
                <p className="font-medium">{router?.locationDetail}</p>
              </div>

              <div>
                <div className="text-gray-500">Status</div>
                <p
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    router?.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : router?.status === "Inactive"
                      ? "bg-red-100 text-red-700"
                      : router?.status === "Damaged"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {router?.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t text-sm">
          <p className="text-gray-500">Detail</p>
          <p className="mt-1 text-gray-700">{router?.detail}</p>
        </div>

        <div className="mt-6 pt-4 border-t flex justify-between text-xs text-gray-400">
          <span>Created: {formatDate(router?.createdAt)}</span>
          <span>Updated: {formatDate(router?.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default RouterDetail;
